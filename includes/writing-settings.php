<?php namespace WSUWP\Plugin\Cost_Tables;

class Writing_Settings {

	private static $options_group = 'writing';


	public static function register_settings() {

		// create section
		add_settings_section(
			self::$options_group,
			'Cost Tables Settings',
			'',
			'writing'
		);

		// register fields
		register_setting( self::$options_group, 'wsu_cost_tables_plugin_enable_editing' );

		// add fields
		add_settings_field(
			'wsu_cost_tables_plugin_enable_editing',
			'Enable Cost Table Editing',
			__CLASS__ . '::input_checkbox',
			'writing',
			self::$options_group,
			array(
				'id'            => 'enable-cost-table-editing-input',
				'label'         => 'Yes',
				'label_for'     => 'wsu_cost_tables_plugin_enable_editing',
				'class'         => '',
				'description'   => '',
				'default_value' => 0,
			)
		);

	}


	public static function input_checkbox( $args ) {

		$option       = get_option( $args['label_for'], $args['default_value'] );
		$checked_attr = checked( 1, (int) $option, false );

		$html  = '<input type="checkbox" id="' . esc_attr( $args['id'] ) . '" name="' . esc_html( $args['label_for'] ) . '" value="1" ' . $checked_attr . '/>';
		$html .= '<label for="' . esc_attr( $args['id'] ) . '">' . esc_attr( $args['label'] ) . '</label>';
		$html .= '<p class="description">' . $args['description'] . '</p>';

		echo $html;

	}


	public static function init() {

		add_action( 'admin_init', __CLASS__ . '::register_settings' );

	}


}

Writing_Settings::init();
