const { InnerBlocks, InspectorControls, useBlockProps, RichText } =
	wp.blockEditor;
const { TextControl, ToggleControl, SelectControl, BaseControl, PanelBody } =
	wp.components;
const { useState } = wp.element;
import { useFetch } from "./hooks";

const Edit = (props) => {
	const { className, attributes, setAttributes } = props;

	const blockClass = "wp-block-wsuwp-cost-tables";
	const apiPath = "/wp-json/wsu-cost-tables/v1/get-cost-table-settings";
	const domain = WSUWP_DATA.siteUrl || "";

	const { data, isLoading, error } = useFetch(`${domain}${apiPath}`);

	if (isLoading) {
		return <p>...loading</p>;
	}

	if (!data || error) {
		return <p>Error: something went wrong.</p>;
	}

	const taxonomySelectData = {
		sessions: data.taxonomies.sessions.map((taxonomy) => {
			return { label: taxonomy.name, value: taxonomy.slug };
		}),
		campuses: data.taxonomies.campuses.map((taxonomy) => {
			return { label: taxonomy.name, value: taxonomy.slug };
		}),
		careerPaths: data.taxonomies.careerPaths.map((taxonomy) => {
			return { label: taxonomy.name, value: taxonomy.slug };
		}),
	};

	return (
		<>
			<div className={`${blockClass}__filters`}>
				<div className={`${blockClass}__filter`}>
					Year/Session
					<span
						className={`${blockClass}__filter-icon dashicons dashicons-arrow-down-alt2`}
					></span>
				</div>

				<div className={`${blockClass}__filter`}>
					Campus
					<span
						className={`${blockClass}__filter-icon dashicons dashicons-arrow-down-alt2`}
					></span>
				</div>
				<div className={`${blockClass}__filter`}>
					Career Path
					<span
						className={`${blockClass}__filter-icon dashicons dashicons-arrow-down-alt2`}
					></span>
				</div>
			</div>
			<TablePreview
				session={attributes.default_session}
				campus={attributes.default_campus}
				careerPath={attributes.default_career_path}
			/>
			<InspectorControls>
				<PanelBody title="Cost Table Settings" initialOpen={true}>
					<SelectControl
						label="Default Session"
						value={
							attributes.default_session
								? attributes.default_session
								: ""
						}
						options={taxonomySelectData.sessions}
						onChange={(session) =>
							setAttributes({ default_session: session })
						}
					/>

					<SelectControl
						label="Default Campus"
						value={
							attributes.default_campus
								? attributes.default_campus
								: "pullman"
						}
						options={taxonomySelectData.campuses}
						onChange={(campus) =>
							setAttributes({ default_campus: campus })
						}
					/>

					<SelectControl
						label="Default Career Path"
						value={
							attributes.default_career_path
								? attributes.default_career_path
								: "undergraduate"
						}
						options={taxonomySelectData.careerPaths}
						onChange={(careerPath) =>
							setAttributes({ default_career_path: careerPath })
						}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

const TablePreview = (props) => {
	const { session, campus, careerPath } = props;
	const apiPath = `/wp-json/wsu-cost-tables/v1/render-table?session=${session}&campus=${campus}&careerPath=${careerPath}`;
	const domain = WSUWP_DATA.siteUrl || "";

	const { data, isLoading, error } = useFetch(`${domain}${apiPath}`);

	if (isLoading) {
		return <p>...loading</p>;
	}

	if (!data && !isLoading) {
		return (
			<p className="wp-block-wsuwp-cost-tables__error">
				Error: No matching table for selected options.
			</p>
		);
	}

	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: data }}></div>
		</>
	);
};

export default Edit;
