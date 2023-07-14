<?php namespace WSUWP\Plugin\Cost_Tables;

class Block_WSUWP_Cost_Tables {


	protected static $block_name    = 'wsuwp/cost-tables';
	protected static $default_attrs = array(
		'className'               => '',
		'data_source'             => '',
		'default_type'            => '',
		'default_session'         => '',
		'default_campus'          => '',
		'default_career_path'     => '',
		'show_session_filter'     => true,
		'show_campus_filter'      => true,
		'show_career_path_filter' => true,
		'error_message'           => 'No results found for the selected options.',
	);


	public static function render( $attrs, $content = '' ) {

		$data = array_merge( self::$default_attrs, $attrs );

		$data['instance_id'] = str_replace( '-', '', wp_generate_uuid4() );
		// $data['settings']                = get_option( 'cost_table_settings', array() );
		$data['data_source']             = $data['data_source'] ? $data['data_source'] : site_url();
		$data['show_session_filter']     = $data['show_session_filter'] ? 'true' : 'false';
		$data['show_campus_filter']      = $data['show_campus_filter'] ? 'true' : 'false';
		$data['show_career_path_filter'] = $data['show_career_path_filter'] ? 'true' : 'false';
		// $data['default_table_content']   = self::get_default_table_content( $data['default_type'], $data['default_session'], $data['default_campus'], $data['default_career_path'] );

		ob_start();

		include plugin_dir_path( __DIR__ ) . '/templates/cost-tables.php';

		return ob_get_clean();

	}


	// private static function get_default_table_content( $type, $session, $campus, $career_path ) {

	// $table_taxonomies = get_option( 'tablepress_table_taxonomies', array() );
	// $matching_table   = null;

	// foreach ( $table_taxonomies as $table_id => $table ) {
	// if ( $table['type'] === $type && $table['session'] === $session && $table['campus'] === $campus && $table['careerPath'] === $career_path ) {
	// $matching_table = $table_id;
	// break;
	// }
	// }

	// if ( $matching_table ) {
	// $id      = str_replace( 'table-', '', $matching_table );
	// $content = do_shortcode( '[table id=' . $id . ' /]' );

	// return ! self::starts_with( $content, '[table' ) ? $content : '';
	// }

	// return '';

	// }


	// private static function starts_with( $haystack, $needle ) {

	// $length = strlen( $needle );
	// return substr( $haystack, 0, $length ) === $needle;

	// }


	public static function replace_placeholders( $output, $table, $render_options ) {

		$settings = get_option( 'cost_table_settings', array() );

		if ( isset( $settings['placeholders'] ) ) {
			$output = str_replace( array_column( $settings['placeholders'], 'slug' ), array_column( $settings['placeholders'], 'name' ), $output );
		}

		return $output;

	}


	public static function register_block() {

		register_block_type(
			self::$block_name,
			array(
				'render_callback' => array( __CLASS__, 'render' ),
				'api_version'     => 2,
				'editor_script'   => 'wsuwp-plugin-cost-tables-block-editor-scripts',
				'editor_style'    => 'wsuwp-plugin-cost-tables-block-editor-styles',
			)
		);

		add_filter(
			'wsu_allowed_blocks_filter',
			function ( $blocks ) {
				if ( ! in_array( self::$block_name, $blocks, true ) ) {
					array_push( $blocks, self::$block_name );
				}

				return $blocks;
			}
		);

	}


	public static function init() {

		add_action( 'init', __CLASS__ . '::register_block' );
		add_filter( 'tablepress_table_output', __CLASS__ . '::replace_placeholders', 99, 3 );

	}

}

Block_WSUWP_Cost_Tables::init();
