import "./front-end.scss";

(function () {
	const CostTable = function (el) {
		const errorMessage = el.dataset.errorMessage || "";
		const filterControls = {
			session: el.querySelector(
				".wsu-cost-tables__filter--session .wsu-cost-tables__filter-select"
			),
			campus: el.querySelector(
				".wsu-cost-tables__filter--campus .wsu-cost-tables__filter-select"
			),
			careerPath: el.querySelector(
				".wsu-cost-tables__filter--career-path .wsu-cost-tables__filter-select"
			),
		};
		const tableContainer = el.querySelector(
			".wsu-cost-tables__table-container"
		);

		let abortController = new AbortController();
		let tableTaxonomies;

		async function getTableTaxonomies() {
			const request = await fetch(
				WSUWP_DATA.siteUrl +
					"/wp-json/wsu-cost-tables/v1/get-table-taxonomies"
			);

			if (request.ok) {
				const settings = await request.json();

				return convertToArray(settings);
			}

			throw new Error("Failed to get taxonomy information for tables.");
		}

		function convertToArray(settings) {
			const keys = Object.keys(settings);

			return keys.map((key) => {
				return {
					tableId: key,
					...settings[key],
				};
			});
		}

		async function getTableContent(table) {
			// cancel previous request
			abortController?.abort();
			abortController = new AbortController();

			let tableContent = "";

			if (table) {
				const tableId = table.tableId;

				const request = await fetch(
					WSUWP_DATA.siteUrl +
						"/wp-json/wsu-cost-tables/v1/render-table?tableId=" +
						tableId.replace("table-", ""),
					{
						signal: abortController.signal,
					}
				);

				if (request.ok) {
					tableContent = await request.json();
				}
			}

			return tableContent === ""
				? `<p class="wsu-cost-tables__error">${errorMessage}</p>`
				: tableContent;
		}

		async function updateTable(filters) {
			tableContainer.innerHTML = "";
			el.classList.add("is-loading");

			const table = tableTaxonomies.find((table) => {
				return (
					table.session === filters.session.value &&
					table.campus === filters.campus.value &&
					table.careerPath === filters.careerPath.value
				);
			});

			tableContainer.innerHTML = await getTableContent(table);

			el.classList.remove("is-loading");
		}

		function bindEvents() {
			Object.values(filterControls).forEach(function (filter) {
				filter.addEventListener("change", function (e) {
					updateTable(filterControls);
				});
			});
		}

		async function init(el) {
			tableTaxonomies = await getTableTaxonomies();

			bindEvents();
		}

		init(el);
	};

	// init cost table instances
	const costTables = document.querySelectorAll(".wsu-cost-tables");

	costTables.forEach((costTable) => {
		new CostTable(costTable);
	});
})();
