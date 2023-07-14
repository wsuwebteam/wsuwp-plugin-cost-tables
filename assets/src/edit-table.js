jQuery(document).ready(function () {
	(function ($) {
		let placeholderToInsert = null;
		let hasAlertedInstructions = false;

		function createPanel() {
			const panelHTML = `
			<div id="tablepress_edit-table-taxonomies" class="postbox">
				<div class="postbox-header">
				<h2 class="hndle ui-sortable-handle">Cost Table Taxonomies</h2>
				<div class="handle-actions hide-if-no-js">
					<button
					type="button"
					class="handle-order-higher"
					aria-disabled="true"
					aria-describedby="tablepress_edit-table-taxonomies-handle-order-higher-description"
					>
					<span class="screen-reader-text">Move up</span>
					<span class="order-higher-indicator" aria-hidden="true"></span>
					</button>
					<span
					class="hidden"
					id="tablepress_edit-table-taxonomies-handle-order-higher-description"
					>Move Table Taxonomies box up</span
					>
					<button
					type="button"
					class="handle-order-lower"
					aria-disabled="false"
					aria-describedby="tablepress_edit-table-taxonomies-handle-order-lower-description"
					>
					<span class="screen-reader-text">Move down</span
					><span class="order-lower-indicator" aria-hidden="true"></span>
					</button>
					<span
					class="hidden"
					id="tablepress_edit-table-taxonomies-handle-order-lower-description"
					>Move Table Taxonomies box down</span
					>
					<button type="button" class="handlediv" aria-expanded="true">
					<span class="screen-reader-text">Toggle panel: Table Taxonomies</span
					><span class="toggle-indicator" aria-hidden="true"></span>
					</button>
				</div>
				</div>
				<div class="inside">
				</div>
			</div>
			`;

			return $(panelHTML).insertAfter(
				"#tablepress_edit-table-information"
			);
		}

		function getTaxonomyOptions(terms, selectedTermSlug) {
			if (!terms) return "";

			return terms
				.map(function (term) {
					return `<option value="${
						term.slug
					}" ${term.slug === selectedTermSlug ? "selected" : ""}>${term.name}</option>`;
				})
				.join("");
		}

		function insertTaxonomyControls(taxonomies, selectedTaxonomies, panel) {
			const container = panel.find(".inside");

			const html = `
			<table class="tablepress-postbox-table fixed">
				<tbody>
					<tr class="bottom-border">
						<th class="column-1" scope="row"><label for="table-tax-session">Type:</label></th>
						<td class="column-2">
							<select id="table-tax-type">
								<option value=""></option>
								${getTaxonomyOptions(taxonomies.types, selectedTaxonomies.type)}
							</select>
						</td>
					</tr>
					<tr class="bottom-border">
						<th class="column-1" scope="row"><label for="table-tax-session">Session:</label></th>
						<td class="column-2">
							<select id="table-tax-session">
								<option value=""></option>
								${getTaxonomyOptions(taxonomies.sessions, selectedTaxonomies.session)}
							</select>
						</td>
					</tr>
					<tr class="bottom-border top-border">
						<th class="column-1" scope="row"><label for="table-tax-campus">Campus:</label></th>
						<td class="column-2">
							<select id="table-tax-campus">
								<option value=""></option>
								${getTaxonomyOptions(taxonomies.campuses, selectedTaxonomies.campus)}
							</select>
						</td>
					</tr>
					<tr class="top-border">
						<th class="column-1" scope="row"><label for="table-tax-career-path">Career Path:</label></th>
						<td class="column-2">
							<select id="table-tax-career-path">
								<option value=""></option>
								${getTaxonomyOptions(taxonomies.careerPaths, selectedTaxonomies.careerPath)}
							</select>
						</td>
					</tr>
				</tbody>
			</table>
			`;

			$(container).html(html);
		}

		async function getTableTaxonomies(tableId) {
			const request = await fetch(
				WSUWP_DATA.siteUrl +
					"/wp-json/wsu-cost-tables/v1/get-table-taxonomies?tableId=" +
					tableId
			);

			if (request.ok) {
				const settings = await request.json();
				return settings;
			}
		}

		async function getCostTableSettings() {
			const request = await fetch(
				WSUWP_DATA.siteUrl +
					"/wp-json/wsu-cost-tables/v1/get-cost-table-settings"
			);

			if (request.ok) {
				const settings = await request.json();
				return settings;
			}

			throw new Error("Failed to load cost table settings");
		}

		async function saveTaxonomySettings() {
			if (!tp.table.id) throw new Error("Table ID must be provided");

			const type = $("#table-tax-type").val();
			const session = $("#table-tax-session").val();
			const campus = $("#table-tax-campus").val();
			const careerPath = $("#table-tax-career-path").val();

			const response = await fetch(
				WSUWP_DATA.siteUrl +
					"/wp-json/wsu-cost-tables/v1/update-table-taxonomies",
				{
					method: "POST",
					body: new URLSearchParams({
						tableId: tp.table.id,
						type: type,
						session: session,
						campus: campus,
						careerPath: careerPath,
					}),
				}
			);
		}

		function insertPlaceholderManipulationOptions(placeholders) {
			const container = $(
				"#tablepress_edit-table-manipulation .tablepress-postbox-table tbody"
			);
			const html = `
				<tr class="top-border">
					<td colspan="2">
						Insert Placeholder:&nbsp;
						${getPlaceholderButtons(placeholders)}
					</td>
				</tr>`;

			container.children().last().addClass("bottom-border");
			container.append(html);
		}

		function getPlaceholderButtons(placeholders) {
			return placeholders
				.map(function (placeholder) {
					return `<button type="button" class="button js-wsu-cost-tables__placeholder-btn" style="margin: 0 3px 5px 0;" data-slug="${placeholder.slug}">${placeholder.slug}</button>`;
				})
				.join("");
		}

		function handlePlaceholderBtnClick(e) {
			if (!hasAlertedInstructions) {
				alert(
					"Please click into the cell you want to add the placeholder to."
				);
				hasAlertedInstructions = true;
			}

			placeholderToInsert = e.currentTarget.dataset.slug;
		}

		function handleTableCellClick(e) {
			if (placeholderToInsert && e.target.type === "textarea") {
				e.target.value = placeholderToInsert;
				placeholderToInsert = null;
			}
		}

		function bindEvents() {
			$(".save-changes-button").on("click", () => {
				saveTaxonomySettings();
			});

			$(".js-wsu-cost-tables__placeholder-btn").on("click", (e) => {
				handlePlaceholderBtnClick(e);
			});

			$("#tablepress_edit-table-data").on("click", function (e) {
				handleTableCellClick(e);
			});
		}

		async function init() {
			const panel = createPanel();
			const settings = await getCostTableSettings();
			const selectedTaxonomies = await getTableTaxonomies(tp.table.id);
			insertPlaceholderManipulationOptions(settings.placeholders);
			insertTaxonomyControls(
				settings.taxonomies,
				selectedTaxonomies,
				panel
			);

			bindEvents();
		}

		if (pagenow === "tablepress_edit") {
			init();
		}
	})(jQuery);
});
