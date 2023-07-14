<?php namespace WSUWP\Plugin\Cost_Tables;

class Plugin {


	private static $version = '0.0.3';


	public static function get( $property ) {

		switch ( $property ) {

			case 'version':
				return self::$version;

			case 'dir':
				return plugin_dir_path( dirname( __FILE__ ) );

			case 'url':
				return plugin_dir_url( dirname( __FILE__ ) );

			case 'template_dir':
				return plugin_dir_path( dirname( __FILE__ ) ) . '/templates';

			default:
				return '';

		}

	}


	public static function init() {

		require_once __DIR__ . '/assets.php';
		require_once __DIR__ . '/writing-settings.php';
		require_once __DIR__ . '/cost-tables-block.php';
		require_once __DIR__ . '/cost-table-shortcode.php';

		if ( 1 === (int) get_option( 'wsu_cost_tables_plugin_enable_editing', 0 ) ) {
			require_once __DIR__ . '/rest-api.php';
			require_once __DIR__ . '/page-settings.php';
		}

	}


	public static function require_class( $class_name ) {

		require_once self::get( 'dir' ) . '/classes/class-' . $class_name . '.php';

	}


}

Plugin::init();
