<?php namespace WSUWP\Plugin\Cost_Tables;

class Assets {

	public static function register_block_editor_assets() {

		$front_end_asset     = include Plugin::get( 'dir' ) . 'assets/dist/front-end.asset.php';
		$block_editor_asset  = include Plugin::get( 'dir' ) . 'assets/dist/block-editor.asset.php';
		$settings_page_asset = include Plugin::get( 'dir' ) . 'assets/dist/settings-page.asset.php';
		$edit_table_asset    = include Plugin::get( 'dir' ) . 'assets/dist/edit-table.asset.php';

		// block editor assets
		wp_register_script(
			'wsuwp-plugin-cost-tables-block-editor-scripts',
			Plugin::get( 'url' ) . 'assets/dist/block-editor.js',
			$block_editor_asset['dependencies'],
			$block_editor_asset['version'],
			true
		);

		wp_register_style(
			'wsuwp-plugin-cost-tables-block-editor-styles',
			Plugin::get( 'url' ) . 'assets/dist/block-editor.css',
			array(),
			$block_editor_asset['version']
		);

		// edit table script
		wp_register_script(
			'wsuwp-plugin-cost-tables-edit-table-scripts',
			Plugin::get( 'url' ) . 'assets/dist/edit-table.js',
			$edit_table_asset['dependencies'],
			$edit_table_asset['version'],
		);

		// settings page
		wp_register_script(
			'wsuwp-plugin-cost-tables-settings-page-scripts',
			Plugin::get( 'url' ) . 'assets/dist/settings-page.js',
			$settings_page_asset['dependencies'],
			$settings_page_asset['version'],
			true
		);

		wp_register_style(
			'wsuwp-plugin-cost-tables-settings-page-styles',
			Plugin::get( 'url' ) . 'assets/dist/settings-page.css',
			array(),
			$settings_page_asset['version']
		);

		// front-end assets
		wp_register_script(
			'wsuwp-plugin-cost-tables-scripts',
			Plugin::get( 'url' ) . 'assets/dist/front-end.js',
			array(),
			$front_end_asset['version'],
			true
		);

		wp_register_style(
			'wsuwp-plugin-cost-tables-styles',
			Plugin::get( 'url' ) . 'assets/dist/front-end.css',
			array(),
			$front_end_asset['version']
		);

	}

	public static function enqueue_assets( $hook ) {

		if ( 1 === (int) get_option( 'wsu_cost_tables_plugin_enable_editing', 0 ) ) {
			if ( 'toplevel_page_tablepress' === $hook ) {
				$script = self::get_inline_wsuwp_data();
				wp_add_inline_script( 'wsuwp-plugin-cost-tables-edit-table-scripts', $script, 'before' );
				wp_enqueue_script( 'wsuwp-plugin-cost-tables-edit-table-scripts' );
			}
		}

	}


	public static function enqueue_frontend_assets() {

		if ( is_singular() ) {

			$id = get_the_ID();

			if ( has_block( 'wsuwp/cost-tables', $id ) ) {
				$script = self::get_inline_wsuwp_data();
				wp_add_inline_script( 'wsuwp-plugin-cost-tables-scripts', $script, 'before' );
				wp_enqueue_script( 'wsuwp-plugin-cost-tables-scripts' );
				wp_enqueue_style( 'wsuwp-plugin-cost-tables-styles' );
			}
		}

	}


	private static function get_inline_wsuwp_data() {

		$script      = 'var WSUWP_COST_TABLES_DATA = {';
			$script .= 'siteUrl: "' . site_url() . '",';
			$script .= 'wpVersion: "' . get_bloginfo( 'version' ) . '",';
			$script .= '};';

		return $script;

	}

	public static function init() {

		add_action( 'init', __CLASS__ . '::register_block_editor_assets' );
		add_action( 'admin_enqueue_scripts', __CLASS__ . '::enqueue_assets', 10, 1 );
		add_action( 'enqueue_block_assets', __CLASS__ . '::enqueue_frontend_assets' );

	}
}

Assets::init();
