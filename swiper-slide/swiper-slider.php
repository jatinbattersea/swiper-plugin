<?php
/**
 * Plugin Name:       Swiper Slider
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       swiper-slider
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
function create_block_swiper_slider_block_init() {
	register_block_type( __DIR__ . '/build' );
	wp_enqueue_style('stylesheet-slider', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css', array(), '9.0.0');
	wp_enqueue_script('script-slider', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js', array('jquery'), '9.0.0', true);
	wp_enqueue_script('slider-init', plugin_dir_url( __FILE__ ) . 'src/swiperInit.js', array('jquery'), '9.0.0', true);
}
add_action( 'init', 'create_block_swiper_slider_block_init' );
