<?php namespace WSUWP\Plugin\Cost_Tables;

class Rest_API {

	public static function init() {

		add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );

	}


	public static function register_routes() {

		register_rest_route(
			'wsu-cost-tables/v1',
			'get-cost-table-settings',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'get_cost_table_settings' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'wsu-cost-tables/v1',
			'get-table-taxonomies',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'get_table_taxonomies' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'wsu-cost-tables/v1',
			'render-table',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'render_table' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'wsu-cost-tables/v1',
			'update-table-taxonomies',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'update_table_taxonomies' ),
				'permission_callback' => '__return_true',
			)
		);

	}


	public static function get_cost_table_settings( \WP_REST_Request $request ) {

		return get_option( 'cost_table_settings', array() );

	}


	public static function get_table_taxonomies( \WP_REST_Request $request ) {

		$params           = $request->get_params();
		$table_taxonomies = get_option(
			'tablepress_table_taxonomies',
			array()
		);

		if ( $params['tableId'] ) {

			return isset( $table_taxonomies[ 'table-' . $params['tableId'] ] ) ? $table_taxonomies[ 'table-' . $params['tableId'] ] : array(
				'type'       => '',
				'session'    => '',
				'campus'     => '',
				'careerPath' => '',
			);

		}

		return $table_taxonomies;

	}


	public static function update_table_taxonomies( \WP_REST_Request $request ) {

		$params      = $request->get_params();
		$option_name = 'tablepress_table_taxonomies';

		$option = get_option( $option_name, array() );

		$option[ 'table-' . $params['tableId'] ] = array(
			'type'       => $params['type'],
			'session'    => $params['session'],
			'campus'     => $params['campus'],
			'careerPath' => $params['careerPath'],
		);

		update_option( $option_name, $option, false );

	}


	public static function render_table( \WP_REST_Request $request ) {

		$params   = $request->get_params();
		$table_id = isset( $params['tableId'] ) ? $params['tableId'] : null;

		if ( ! $table_id ) {
			if ( isset( $params['type'] ) && isset( $params['session'] ) && isset( $params['campus'] ) && isset( $params['careerPath'] ) ) {
				$table_taxonomies = get_option(
					'tablepress_table_taxonomies',
					array()
				);

				foreach ( $table_taxonomies as $key => $taxonomies ) {
					if ( $taxonomies['type'] === $params['type']
						&& $taxonomies['session'] === $params['session']
						&& $taxonomies['campus'] === $params['campus']
						&& $taxonomies['careerPath'] === $params['careerPath'] ) {

						$table_id = str_replace( 'table-', '', $key );
						break;
					}
				}
			} else {
				return '';
			}
		}

		// $content = do_shortcode( '[table id=' . $params['tableId'] . ' cache_table_output=false /]' );
		$content = do_shortcode( '[table id=' . $table_id . ' /]' );

		return ! self::starts_with( $content, '[table' ) ? $content : '';

	}

	private static function starts_with( $haystack, $needle ) {

		$length = strlen( $needle );
		return substr( $haystack, 0, $length ) === $needle;

	}

}

Rest_API::init();
