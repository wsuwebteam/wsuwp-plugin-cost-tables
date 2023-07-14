const { InspectorControls } = wp.blockEditor;
const { ToggleControl, SelectControl, PanelBody } = wp.components;
import { useFetch } from "./hooks";
import HostControl from "./host-control";

const Edit = (props) => {
	const { className, attributes, setAttributes } = props;

	const blockClass = "wp-block-wsuwp-cost-tables";
	const apiPath = "/wp-json/wsu-cost-tables/v1/get-cost-table-settings";
	const host = attributes.data_source || WSUWP_COST_TABLES_DATA.siteUrl || "";

	const { data, isLoading, error } = useFetch(`${host}${apiPath}`);

	if (isLoading) {
		return <p>...loading</p>;
	}

	const taxonomySelectData = !!data
		? {
				types: data.taxonomies.types.map((taxonomy) => {
					return { label: taxonomy.name, value: taxonomy.slug };
				}),
				sessions: data.taxonomies.sessions.map((taxonomy) => {
					return { label: taxonomy.name, value: taxonomy.slug };
				}),
				campuses: data.taxonomies.campuses.map((taxonomy) => {
					return { label: taxonomy.name, value: taxonomy.slug };
				}),
				careerPaths: data.taxonomies.careerPaths.map((taxonomy) => {
					return { label: taxonomy.name, value: taxonomy.slug };
				}),
		  }
		: null;

	if (!data || error) {
		return (
			<>
				<p className={`${blockClass}__api-error`}>
					<span
						className={`${blockClass}__api-error-icon dashicons dashicons-warning`}
					></span>
					Error: something went wrong requesting information from the
					data source.
				</p>
				{getInspectorControls()}
			</>
		);
	}

	// set defaults
	if (attributes.initialized === false) {
		setAttributes({
			initialized: true,
			data_source: "https://financialaid.wsu.edu",
			default_type: taxonomySelectData.types[0].value,
			default_session: taxonomySelectData.sessions[0].value,
			default_campus: "pullman",
			default_career_path: "undergraduate",
		});
	}

	function getInspectorControls() {
		return (
			<>
				<InspectorControls>
					<PanelBody title="Cost Table Settings" initialOpen={true}>
						{taxonomySelectData && (
							<>
								<SelectControl
									label="Table Type"
									value={attributes.default_type}
									options={taxonomySelectData.types}
									onChange={(type) =>
										setAttributes({ default_type: type })
									}
								/>

								<SelectControl
									label="Default Session"
									value={attributes.default_session}
									options={taxonomySelectData.sessions}
									onChange={(session) =>
										setAttributes({
											default_session: session,
										})
									}
								/>

								<SelectControl
									label="Default Campus"
									value={attributes.default_campus}
									options={taxonomySelectData.campuses}
									onChange={(campus) =>
										setAttributes({
											default_campus: campus,
										})
									}
								/>

								<SelectControl
									label="Default Career Path"
									value={attributes.default_career_path}
									options={taxonomySelectData.careerPaths}
									onChange={(careerPath) =>
										setAttributes({
											default_career_path: careerPath,
										})
									}
								/>
							</>
						)}

						<ToggleControl
							label="Show Year/Session Filter"
							checked={attributes.show_session_filter}
							onChange={(show_session_filter) =>
								setAttributes({ show_session_filter })
							}
						/>

						<ToggleControl
							label="Show Campus Filter"
							checked={attributes.show_campus_filter}
							onChange={(show_campus_filter) =>
								setAttributes({ show_campus_filter })
							}
						/>

						<ToggleControl
							label="Show Career Path Filter"
							checked={attributes.show_career_path_filter}
							onChange={(show_career_path_filter) =>
								setAttributes({ show_career_path_filter })
							}
						/>

						<HostControl
							label="Data Source"
							value={attributes.data_source}
							onChange={(data_source) =>
								setAttributes({ data_source })
							}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	}

	return (
		<>
			<div className={`${blockClass}__filters`}>
				{attributes.show_session_filter && (
					<div className={`${blockClass}__filter`}>
						Year/Session
						<span
							className={`${blockClass}__filter-icon dashicons dashicons-arrow-down-alt2`}
						></span>
					</div>
				)}

				{attributes.show_campus_filter && (
					<div className={`${blockClass}__filter`}>
						Campus
						<span
							className={`${blockClass}__filter-icon dashicons dashicons-arrow-down-alt2`}
						></span>
					</div>
				)}

				{attributes.show_career_path_filter && (
					<div className={`${blockClass}__filter`}>
						Career Path
						<span
							className={`${blockClass}__filter-icon dashicons dashicons-arrow-down-alt2`}
						></span>
					</div>
				)}
			</div>
			<TablePreview
				host={host}
				type={attributes.default_type}
				session={attributes.default_session}
				campus={attributes.default_campus}
				careerPath={attributes.default_career_path}
			/>

			{getInspectorControls()}
		</>
	);
};

const TablePreview = (props) => {
	const { host, type, session, campus, careerPath } = props;
	const apiPath = `/wp-json/wsu-cost-tables/v1/render-table?type=${type}&session=${session}&campus=${campus}&careerPath=${careerPath}`;

	const { data, isLoading, error } = useFetch(`${host}${apiPath}`);

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
