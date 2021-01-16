<?php 
$scriptBase = str_replace(DIRECTORY_SEPARATOR, '/', dirname($_SERVER['SCRIPT_NAME']));
$apiPath = substr($_SERVER['REQUEST_URI'], strlen($scriptBase));
$apiPath = ($apiPath[0] != '/') ? '/' . $apiPath : $apiPath;
$headers = [];
$dataToReturn = null;

switch($apiPath){
    case '/data': 
        array_push($headers, 'Content-Type: application/json');
        $data = file_get_contents('../data/data.json');
        break;
};

// output
foreach($headers as $h){
    echo header($h);
}

echo $data;