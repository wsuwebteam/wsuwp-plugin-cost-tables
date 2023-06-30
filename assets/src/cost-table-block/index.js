import { registerBlockType } from "@wordpress/blocks";

import Edit from "./edit";

registerBlockType("wsuwp/cost-tables", {
	title: "Cost Tables",
	icon: "money-alt",
	category: "text",
	attributes: {
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
	},
	edit: Edit,
	save: function () {
		return null;
	},
});
