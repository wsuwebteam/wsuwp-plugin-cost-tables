import "./front-end.scss";

(function () {
	const CostTable = function (el) {
		const host =
			el.dataset.dataSource || WSUWP_COST_TABLES_DATA.siteUrl || "";
		const showSessionFilter = el.dataset.showSessionFilter === "true";
		const showCampusFilter = el.dataset.showCampusFilter === "true";
		const showCareerPathFilter = el.dataset.showCareerPathFilter === "true";
		const instanceId = el.dataset.componentId || "";
		const errorMessage = el.dataset.errorMessage || "";

		let tableSettings;
		let tableTaxonomies;
		let filterControls;
		let tableContainer;
		let abortController = new AbortController();

		function convertToArray(settings) {
			const keys = Object.keys(settings);

			return keys.map((key) => {
				return {
					tableId: key,
					...settings[key],
				};
			});
		}

		async function getTableSettings() {
			const request = await fetch(
				host + "/wp-json/wsu-cost-tables/v1/get-cost-table-settings"
			);

			if (request.ok) {
				return await request.json();
			}

			throw new Error("Failed to get cost table setting.");
		}

		async function getTableTaxonomies() {
			const request = await fetch(
				host + "/wp-json/wsu-cost-tables/v1/get-table-taxonomies"
			);

			if (request.ok) {
				const response = await request.json();

				return convertToArray(response);
			}

			throw new Error("Failed to get taxonomy information for tables.");
		}

		async function getTableContent(table) {
			// cancel previous request
			abortController?.abort();
			abortController = new AbortController();

			let tableContent = "";

			if (table) {
				const tableId = table.tableId;

				const request = await fetch(
					host +
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

			const lookupSession = filters.session?.value
				? filters.session.value
				: el.dataset.defaultSession;
			const lookupCampus = filters.campus?.value
				? filters.campus.value
				: el.dataset.defaultCampus;
			const lookupCareerPath = filters.careerPath?.value
				? filters.careerPath.value
				: el.dataset.defaultCareerPath;

			const table = tableTaxonomies.find((table) => {
				return (
					table.type === el.dataset.defaultType &&
					table.session === lookupSession &&
					table.campus === lookupCampus &&
					table.careerPath === lookupCareerPath
				);
			});

			tableContainer.innerHTML = await getTableContent(table);

			el.classList.remove("is-loading");
		}

		function getFilterControlContent(
			label = "",
			property = "",
			options = [],
			defaultValue = ""
		) {
			return `
			<div class="wsu-cost-tables__filter wsu-cost-tables__filter--${property}">
				<label
				class="wsu-cost-tables__filter-label"
				for="wsu-cost-table-filter-${property}-${instanceId}"
				>${label}</label
				><select
				data-property="${property}"
				class="wsu-cost-tables__filter-select"
				id="wsu-cost-table-filter-${property}-${instanceId}"
				>
				${options.map((option) => {
					return `<option value="${option.slug}" ${
						defaultValue === option.slug
							? 'selected="selected"'
							: ""
					}>${option.name}</option>`;
				})}
				</select>
			</div>
			`;
		}

		function getFilterControlsContent(tableSettings) {
			let content = "";

			content += showSessionFilter
				? getFilterControlContent(
						"Year/Session",
						"session",
						tableSettings.taxonomies.sessions,
						el.dataset.defaultSession
				  )
				: "";
			content += showCampusFilter
				? getFilterControlContent(
						"Campus",
						"campus",
						tableSettings.taxonomies.campuses,
						el.dataset.defaultCampus
				  )
				: "";
			content += showCareerPathFilter
				? getFilterControlContent(
						"Career Path",
						"career-path",
						tableSettings.taxonomies.careerPaths,
						el.dataset.defaultCareerPath
				  )
				: "";

			return content;
		}

		function setupTable(tableSettings) {
			// create html for table
			const html = `
				${
					showSessionFilter ||
					showCampusFilter ||
					showCareerPathFilter
						? `<div class="wsu-cost-tables__filters">
								${getFilterControlsContent(tableSettings)}
							</div>`
						: ""
				}
				<div class="wsu-cost-tables__loading"></div>
				<div class="wsu-cost-tables__table-container"></div>
			`;

			// set table html content
			el.innerHTML = html;

			// store dom elements for events
			return {
				filterControls: {
					session: el.querySelector(
						".wsu-cost-tables__filter--session .wsu-cost-tables__filter-select"
					),
					campus: el.querySelector(
						".wsu-cost-tables__filter--campus .wsu-cost-tables__filter-select"
					),
					careerPath: el.querySelector(
						".wsu-cost-tables__filter--career-path .wsu-cost-tables__filter-select"
					),
				},
				tableContainer: el.querySelector(
					".wsu-cost-tables__table-container"
				),
			};
		}

		function bindEvents() {
			Object.values(filterControls).forEach(function (filter) {
				filter?.addEventListener("change", function (e) {
					updateTable(filterControls);
				});
			});
		}

		async function init() {
			// get needed data
			tableSettings = await getTableSettings();
			tableTaxonomies = await getTableTaxonomies();

			// sort table data by last modified
			tableTaxonomies.sort(function (a, b) {
				const aTime = a.lastModified ? a.lastModified : 0;
				const bTime = b.lastModified ? b.lastModified : 0;

				return bTime - aTime;
			});

			// configure DOM
			({ filterControls, tableContainer } = setupTable(tableSettings));

			// load default table
			updateTable(filterControls);

			// bind for future events
			bindEvents();
		}

		init();
	};

	// init cost table instances
	const costTables = document.querySelectorAll(".wsu-cost-tables");

	costTables.forEach((costTable) => {
		new CostTable(costTable);
	});
})();
