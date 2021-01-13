<?php 
$scriptBase = str_replace(DIRECTORY_SEPARATOR, '/', dirname($_SERVER['SCRIPT_NAME']));
$apiPath = substr($_SERVER['REQUEST_URI'], strlen($scriptBase));
$apiPath = ($apiPath[0] != '/') ? '/' . $apiPath : $apiPath;

echo '<pre>';
var_dump($apiPath);
var_dump($_POST);
var_dump($_GET);
