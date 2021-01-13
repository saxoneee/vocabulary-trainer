<?php
// webpack starts a web server that uses the built-in php server
// the app will run on apache
// this script makes the api run on the built-in php server

// workaround to get the right path in dev
$basePath = null;

return call_user_func(function () {
    global $publicDir;
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $publicDir = __DIR__ . DIRECTORY_SEPARATOR . 'src'. DIRECTORY_SEPARATOR .'php';
    $basePath = $publicDir;
    $uri = urldecode($uri);
 
    $requested = $publicDir . DIRECTORY_SEPARATOR . $uri;
 
    if ($uri !== DIRECTORY_SEPARATOR && file_exists($requested)) {
        return false;
    }
 
    require_once $publicDir . DIRECTORY_SEPARATOR.'router.php';
});