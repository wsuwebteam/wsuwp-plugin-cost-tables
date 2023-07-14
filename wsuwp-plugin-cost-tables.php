<?php
/**
 * Plugin Name: WSUWP Plugin Cost Tables
 * Plugin URI: https://github.com/wsuwebteam/wsuwp-plugin-cost-tables
 * Description: Plugin for managing financial aid cost tables
 * Version: 0.0.3
 * Requires PHP: 7.3
 * Author: Washington State University, Dan White
 * Author URI: https://web.wsu.edu/
 * Text Domain: wsuwp-plugin-cost-tables
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Initiate plugin
require_once __DIR__ . '/includes/plugin.php';
