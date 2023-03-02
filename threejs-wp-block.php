<?php
/**
 * Plugin Name: threejs WP block
 * Plugin URI: https://github.com/erikyo/typescript-wp-block
 * Description: WordPress block boilerplate in typescript
 * Version: 0.0.1
 * Author: codekraft
 */

function three_scripts() {
	wp_enqueue_script( 'three', plugin_dir_url( __FILE__ ) . 'build/three.module.js' );
}
add_action( 'wp_enqueue_scripts', 'three_scripts' );
// add_action( 'admin_enqueue_scripts', 'three_scripts' );



function add_type_attribute( $tag, $handle, $src ) {
	// if not your script, do nothing and return original $tag
	if ( 'three' !== $handle ) {
		return $tag;
	}
	// change the script tag by adding type="module" and return it.
	$tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
	return $tag;
}
add_filter( 'script_loader_tag', 'add_type_attribute', 10, 3 );



add_action( 'init', function() {
	register_block_type( __DIR__ );
} );
