import { useFetch } from "./hooks";
import HostControl from "./host-control";

const { useBlockProps, InspectorControls } = wp.blockEditor;
const { ToggleControl, SelectControl, PanelBody } = wp.components;
const { useEffect, useMemo } = wp.element;

const Edit = (props) => {
	const { attributes, setAttributes } = props;

	const defaultDataSource = "https://financialaid.wsu.edu";
	const blockClass = "wp-block-wsuwp-cost-tables";
	const apiPath = "/wp-json/wsu-cost-tables/v1/get-cost-table-settings";
	const emptyOptions = [
		{
			label: "",
			value: "",
		},
	];
	const host = attributes.data_source || WSUWP_COST_TABLES_DATA.siteUrl || "";

	const { data, isLoading, error } = useFetch(`${host}${apiPath}`);

	const taxonomySelectData = useMemo(
		() =>
			!!data
				? {
						types: data.taxonomies?.types.map((taxonomy) => {
							return {
								label: taxonomy.name,
								value: taxonomy.slug,
							};
						}),
						sessions: data.taxonomies?.sessions.map((taxonomy) => {
							return {
								label: taxonomy.name,
								value: taxonomy.slug,
							};
						}),
						campuses: data.taxonomies?.campuses.map((taxonomy) => {
							return {
								label: taxonomy.name,
								value: taxonomy.slug,
							};
						}),
						careerPaths: data.taxonomies?.careerPaths.map(
							(taxonomy) => {
								return {
									label: taxonomy.name,
									value: taxonomy.slug,
								};
							}
						),
				  }
				: null,
		[data]
	);

	function getFirstValue(list) {
		return list && list[0] && list[0].value ? list[0].value : "";
	}

	function isInOptions(value, options) {
		return options.some((option) => option.value === value);
	}

	function resolveDefaultValue(field, options, values) {
		if (
			Array.isArray(options) &&
			!isInOptions(attributes[field], options)
		) {
			values[field] = getFirstValue(options);
		}
	}

	// set defaults ... ugly/complicated I know tell me about it
	useEffect(() => {
		const values = {};

		if (attributes.initialized === false) {
			values.initialized = true;
			values.data_source = defaultDataSource;
			values.default_campus = "pullman";
			values.default_career_path = "undergraduate";
		}

		if (taxonomySelectData) {
			resolveDefaultValue(
				"default_type",
				taxonomySelectData.types,
				values
			);
			resolveDefaultValue(
				"default_session",
				taxonomySelectData.sessions,
				values
			);
			resolveDefaultValue(
				"default_campus",
				taxonomySelectData.campuses,
				values
			);
			resolveDefaultValue(
				"default_career_path",
				taxonomySelectData.careerPaths,
				values
			);
		}

		if (Object.keys(values).length > 0) {
			setAttributes(values);
		}
	}, [taxonomySelectData]);

	function getInspectorControls() {
		return (
			<>
				<InspectorControls>
					<PanelBody title="Cost Table Settings" initialOpen={true}>
						<SelectControl
							label="Table Type"
							value={attributes.default_type}
							options={taxonomySelectData?.types || emptyOptions}
							onChange={(type) =>
								setAttributes({ default_type: type })
							}
						/>

						<SelectControl
							label="Default Session"
							value={attributes.default_session}
							options={
								taxonomySelectData?.sessions || emptyOptions
							}
							onChange={(session) =>
								setAttributes({
									default_session: session,
								})
							}
						/>

						<SelectControl
							label="Default Campus"
							value={attributes.default_campus}
							options={
								taxonomySelectData?.campuses || emptyOptions
							}
							onChange={(campus) =>
								setAttributes({
									default_campus: campus,
								})
							}
						/>

						<SelectControl
							label="Default Career Path"
							value={attributes.default_career_path}
							options={
								taxonomySelectData?.careerPaths || emptyOptions
							}
							onChange={(careerPath) =>
								setAttributes({
									default_career_path: careerPath,
								})
							}
						/>

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
							value={
								attributes.initialized
									? attributes.data_source
									: defaultDataSource
							}
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
			<Wrapper>
				{isLoading && <p>...loading</p>}

				{!isLoading && (!data || error) && (
					<p className={`${blockClass}__api-error`}>
						<span
							className={`${blockClass}__api-error-icon dashicons dashicons-warning`}
						></span>
						Error: something went wrong requesting information from
						the data source.
					</p>
				)}

				{data && (
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
					</>
				)}
			</Wrapper>

			{getInspectorControls()}
		</>
	);
};

const Wrapper = (props) => {
	const blockProps = useBlockProps();

	return <div {...blockProps}>{props.children}</div>;
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
