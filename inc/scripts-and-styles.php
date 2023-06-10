<?php

// Register scripts and styles.
add_action('wp_enqueue_scripts', function () {
	$manifestPath = get_theme_file_path('dist/manifest.json');
	if ($GLOBALS['VITE_DEV']) {
		wp_enqueue_script('vite', 'http://localhost:8081/@vite/client', [], null);
		wp_enqueue_script('theme-dev', 'http://localhost:8081/src/main.ts', [], null);
		wp_enqueue_style('theme-dev', 'http://localhost:8081/src/main.css', [], null);
	} else if (file_exists($manifestPath)) {
		$manifest = json_decode(file_get_contents($manifestPath), true);
		wp_enqueue_script('theme-dev', get_theme_file_uri('dist/' . $manifest['src/main.ts']['file']), [], null);
		wp_enqueue_style('theme-dev', get_theme_file_uri('dist/' . $manifest['src/main.css']['file']), [], null);
	}
});

// Load scripts as modules.
add_filter('script_loader_tag', function (string $tag, string $handle, string $src) {
	if (in_array($handle, ['vite', 'theme-dev']))
		return '<script type="module" src="' . esc_url($src) . '" defer></script>';
	return $tag;
}, 10, 3);
