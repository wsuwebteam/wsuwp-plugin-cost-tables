<?php namespace WSUWP\Plugin\Cost_Tables;

class Page_Settings {

	private static $page_slug = 'cost_table_settings';

	private static $option_title = 'cost_table_settings';

	public static function add_settings_page() {

		add_submenu_page(
			'tablepress',
			'Cost Table Settings',
			'Cost Table Settings',
			'manage_options',
			self::$page_slug,
			__CLASS__ . '::cost_table_settings_content',
			2
		);

	}


	private static function update_settings( $post_data ) {

		$settings_data = array();

		$settings_data['placeholders']              = self::normalize_values( $post_data['placeholders'] );
		$settings_data['taxonomies']['sessions']    = self::normalize_values( $post_data['sessions'] );
		$settings_data['taxonomies']['campuses']    = self::normalize_values( $post_data['campuses'] );
		$settings_data['taxonomies']['careerPaths'] = self::normalize_values( $post_data['careerPaths'] );

		update_option( self::$option_title, $settings_data, false );

	}


	private static function normalize_values( $data ) {

		$data = array_map(
			function( $value ) {
				return array(
					'name' => wp_kses_post(
						$value['name']
					),
					'slug' => wp_kses_post(
						$value['slug']
					),
				);
			},
			$data,
		);

			$filtered_values = array_filter(
				$data,
				function ( $value ) {
					return ! empty( $value['name'] );
				}
			);

		return array_values( $filtered_values );

	}


	public static function enqueue_assets( $hook ) {

		if ( 'tablepress_page_cost_table_settings' === $hook ) {
			wp_enqueue_script( 'wsuwp-plugin-cost-tables-settings-page-scripts' );
			wp_enqueue_style( 'wsuwp-plugin-cost-tables-settings-page-styles' );
		}

	}


	private static function kvp_group( $entries, $setting_name, $pre_slug = '', $post_slug = '' ) {

		echo '<div class="wsuwp-cost-tables-settings__kvp-group" data-group-label="' . $setting_name . '" data-pre-slug="' . $pre_slug . '" data-post-slug="' . $post_slug . '">';
		echo '<ul class="wsuwp-cost-tables-settings__kvp-list">';
		if ( ! empty( $entries ) ) {
			foreach ( $entries as $key => $entry ) {
				echo '<li class="wsuwp-cost-tables-settings__kvp-item">';
				echo '<div class="wsuwp-cost-tables-settings__input-container"><input class="wsuwp-cost-tables-settings__input wsuwp-cost-tables-settings__input--name" type="text" name="settings[' . $setting_name . '][' . $key . '][name]" value="' . esc_attr( $entry['name'] ) . '" setting="name" /></div>';
				echo '<div class="wsuwp-cost-tables-settings__input-container"><input class="wsuwp-cost-tables-settings__input wsuwp-cost-tables-settings__input--slug" type="text" name="settings[' . $setting_name . '][' . $key . '][slug]" value="' . esc_attr( $entry['slug'] ) . '" setting="slug" readonly /></div>';
				echo '<div><button type="button" title="Remove" aria-label="Remove" class="wsuwp-cost-tables-settings__remove-btn"><span class="dashicons dashicons-trash" aria-hidden="true"></span></button></div>';
				echo '</li>';
			}
		} else {
			echo '<li class="wsuwp-cost-tables-settings__kvp-item">';
			echo '<div class="wsuwp-cost-tables-settings__input-container"><input class="wsuwp-cost-tables-settings__input wsuwp-cost-tables-settings__input--name" type="text" name="settings[' . $setting_name . '][0][name]" placeholder="name" value="" /></div>';
			echo '<div class="wsuwp-cost-tables-settings__input-container"><input class="wsuwp-cost-tables-settings__input wsuwp-cost-tables-settings__input--slug" type="text" name="settings[' . $setting_name . '][0][slug]" placeholder="slug" value="" /></div>';
			echo '<div><button type="button" title="Remove" aria-label="Remove" class="wsuwp-cost-tables-settings__remove-btn"><span class="dashicons dashicons-trash" aria-hidden="true"></span></button></div>';
			echo '</li>';
		}
		echo '</ul>';
		echo '<button type="button" class="button button-small button-secondary wsuwp-cost-tables-settings__kvp-add">Add New</button>';
		echo '</div>';

	}


	public static function cost_table_settings_content() {

		// check user capabilities
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if ( isset( $_POST['save_settings'] ) && check_admin_referer( self::$page_slug . '_nonce' ) && isset( $_POST['settings'] ) ) {
			self::update_settings( $_POST['settings'] );
			echo '<div class="notice notice-success"><p>Changes Saved</p></div>';
		}

		$settings = get_option( self::$option_title, array() );
		?>
		<div id="js-wsuwp-cost-tables-settings" class="wrap wsuwp-cost-tables-settings">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>

			<form method="post" action="admin.php?page=<?php echo esc_attr( self::$page_slug ); ?>">

				<?php
				submit_button( 'Save Settings' );
				wp_nonce_field( self::$page_slug . '_nonce' );
				echo '<input type="hidden" value="true" name="save_settings" />';

				echo '<h2>Placeholders</h2>';
				// echo '<p>This is a test</p>';
				self::kvp_group( $settings['placeholders'], 'placeholders', '[', ']' );

				echo '<hr/>';

				echo '<h2>Taxonomies</h2>';
				// echo '<p>This is a test</p>';

				echo '<h3>Sessions</h3>';
				self::kvp_group( $settings['taxonomies']['sessions'], 'sessions' );

				echo '<h3>Campuses</h3>';
				self::kvp_group( $settings['taxonomies']['campuses'], 'campuses' );

				echo '<h3>Career Paths</h3>';
				self::kvp_group( $settings['taxonomies']['careerPaths'], 'careerPaths' );
				?>


				<?php
					submit_button( 'Save Settings' );
				?>
			</form>
		</div>
		<?php
	}


	public static function init() {

		add_action( 'admin_menu', __CLASS__ . '::add_settings_page', 99 );
		add_action( 'admin_enqueue_scripts', __CLASS__ . '::enqueue_assets', 10, 1 );

	}


}

Page_Settings::init();
