import { cleanForSlug } from "@wordpress/url";
import _debounce from "lodash/debounce";

import "./settings-page.scss";

jQuery(document).ready(function () {
	(function ($) {
		const container = $("#js-wsuwp-cost-tables-settings");

		function removeKVP(btnRef) {
			const list = btnRef.closest(
				".wsuwp-cost-tables-settings__kvp-list"
			);
			btnRef.closest(".wsuwp-cost-tables-settings__kvp-item").remove();

			if (list.childElementCount === 0) {
				insertEmptyKVP(list);
			}
		}

		function insertEmptyKVP(list) {
			const key = Date.now(); // temporary unique identifier
			const groupContainer = list.closest(
				".wsuwp-cost-tables-settings__kvp-group"
			);
			const groupLabel = groupContainer.dataset.groupLabel;
			console.log(groupLabel);
			console.log(list);
			const template = `
			<li class="wsuwp-cost-tables-settings__kvp-item">
			<div class="wsuwp-cost-tables-settings__input-container"><input class="wsuwp-cost-tables-settings__input wsuwp-cost-tables-settings__input--name" type="text" name="settings[${groupLabel}][${key}][name]" value="" placeholder="name" /></div>
			<div class="wsuwp-cost-tables-settings__input-container"><input class="wsuwp-cost-tables-settings__input wsuwp-cost-tables-settings__input--slug" type="text" name="settings[${groupLabel}][${key}][slug]" value="" placeholder="slug" /></div>
			<div><button type="button" title="Remove" aria-label="Remove" class="wsuwp-cost-tables-settings__remove-btn"><span class="dashicons dashicons-trash" aria-hidden="true"></span></button></div>
			</li>
			`;

			$(list).append(template);
		}

		function handleContainerClick(e) {
			const removeBtn = e.target.closest(
				".wsuwp-cost-tables-settings__remove-btn"
			);
			const addNewBtn = e.target.closest(
				".wsuwp-cost-tables-settings__kvp-add"
			);

			if (removeBtn) {
				if (confirm("Are you sure?")) {
					removeKVP(removeBtn);
				}
			}

			if (addNewBtn) {
				const list = addNewBtn.previousElementSibling;
				insertEmptyKVP(list);
			}
		}

		function handleContainerKeyUp(e) {
			const input = e.target.closest(
				".wsuwp-cost-tables-settings__input--name"
			);

			if (input) {
				const slugInput = input
					.closest(".wsuwp-cost-tables-settings__kvp-item")
					?.querySelector(
						".wsuwp-cost-tables-settings__input--slug:not([readonly])"
					);

				if (slugInput) {
					const groupContainer = slugInput.closest(
						".wsuwp-cost-tables-settings__kvp-group"
					);
					const preSlug = groupContainer.dataset.preSlug || "";
					const postSlug = groupContainer.dataset.postSlug || "";
					const slugValue = cleanForSlug(input.value);
					slugInput.value = preSlug + slugValue + postSlug;
				}
			}
		}

		function bindEvents() {
			container.on("click", function (e) {
				handleContainerClick(e);
			});

			container.on("keyup", _debounce(handleContainerKeyUp, 150));
		}

		function init() {
			bindEvents();
		}

		init();
	})(jQuery);
});
