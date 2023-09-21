<?php
/**
 * Plugin Name:       CosmicBlocks
 * Description:       Set of blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Christian Miguez
 * Author URI:        https://christianmiguez.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cosmicblocks
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */


namespace Cosmic;

// the following ABSPATH check is required to prevent direct access to the plugin
 if ( ! defined( 'ABSPATH' ) ) {
	die('Silence is golden'); // Exit if accessed directly.
}


final class SpaceBlocks {
	static function init() {
		add_action( 'init', function()  {
			add_filter('block_categories_all', function($categories){
				 array_unshift(
					$categories,
						array(
							'slug' => 'cosmicblocks',
							'title' => __( 'Cosmic Blocks', 'cosmicblocks' ),
							'icon'  => 'welcome-widgets-menus'
						),
					
				);

				return $categories;
			});
			register_block_type( __DIR__ . '/build/blocks/curvy' );
			register_block_type( __DIR__ . '/build/blocks/clicky-group' );
			register_block_type( __DIR__ . '/build/blocks/clicky-button' );
			register_block_type( __DIR__ . '/build/blocks/piccy-gallery' );
			register_block_type( __DIR__ . '/build/blocks/piccy-image' );


		});
	}
	static function convert_custom_properties($value) {
		$prefix     = 'var:';
		$prefix_len = strlen($prefix);
		$token_in   = '|';
		$token_out  = '--';
		if (str_starts_with($value, $prefix)) {
			$unwrapped_name = str_replace(
				$token_in,
				$token_out,
				substr($value, $prefix_len)
			);
			$value          = "var(--wp--$unwrapped_name)";
		}

		return $value;
	}
}

SpaceBlocks::init();