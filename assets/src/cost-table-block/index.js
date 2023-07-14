import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";

registerBlockType("wsuwp/cost-tables", {
	title: "Cost Tables",
	icon: "money-alt",
	category: "text",
	attributes: {
		initialized: {
			type: "boolean",
			default: false,
		},
		data_source: {
			type: "string",
			default: "",
		},
		default_type: {
			type: "string",
			default: "",
		},
		default_session: {
			type: "string",
			default: "",
		},
		default_campus: {
			type: "string",
			default: "",
		},
		default_career_path: {
			type: "string",
			default: "",
		},
		show_session_filter: {
			type: "boolean",
			default: true,
		},
		show_campus_filter: {
			type: "boolean",
			default: true,
		},
		show_career_path_filter: {
			type: "boolean",
			default: true,
		},
	},
	edit: Edit,
	save: function () {
		return null;
	},
});
