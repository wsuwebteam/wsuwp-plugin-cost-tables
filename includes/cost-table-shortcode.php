<?php namespace WSUWP\Plugin\Cost_Tables;

class WSUWP_Cost_Table_Shortcode {


	public static function display_wsuwp_cost_tables( $attrs ) {

		$script      = 'const WSUWP_DATA = {';
			$script .= 'siteUrl: "' . site_url() . '",';
			$script .= 'wpVersion: "' . get_bloginfo( 'version' ) . '",';
			$script .= '};';
		wp_add_inline_script( 'wsuwp-plugin-cost-tables-scripts', $script, 'before' );
		wp_enqueue_script( 'wsuwp-plugin-cost-tables-scripts' );
		wp_enqueue_style( 'wsuwp-plugin-cost-tables-styles' );

		$table_settings = get_option( 'cost_table_settings', array() );

		$data = shortcode_atts(
			array(
				'className'               => '',
				'data_source'             => site_url(),
				'default_type'            => $table_settings['taxonomies']['types'][0]['slug'],
				'default_session'         => '',
				'default_campus'          => 'pullman',
				'default_career_path'     => 'undergraduate',
				'show_session_filter'     => 'true',
				'show_campus_filter'      => 'true',
				'show_career_path_filter' => 'true',
				'error_message'           => 'No results found for the selected options.',
			),
			$attrs
		);

		$data['instance_id'] = str_replace( '-', '', wp_generate_uuid4() );

		ob_start();

		include plugin_dir_path( __DIR__ ) . '/templates/cost-tables.php';

		return ob_get_clean();

	}


	public static function init() {

		add_shortcode( 'wsuwp_cost_table', __CLASS__ . '::display_wsuwp_cost_tables' );

	}


}

WSUWP_Cost_Table_Shortcode::init();
