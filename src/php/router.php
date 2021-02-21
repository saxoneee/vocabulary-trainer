<?php 
$scriptBase = str_replace(DIRECTORY_SEPARATOR, '/', dirname($_SERVER['SCRIPT_NAME']));
$apiPath = substr($_SERVER['REQUEST_URI'], strlen($scriptBase));
$apiPath = ($apiPath[0] != '/') ? '/' . $apiPath : $apiPath;
$apiPath = (strpos($apiPath,'?') !== false) ? substr($apiPath,0,strpos($apiPath,'?')) : $apiPath;
$headers = [];
$dataToReturn = null;

switch($apiPath){
    case '/data': 
        array_push($headers, 'Content-Type: application/json');
        $dataName = preg_replace('/[^a-zA-Z0-9\-_]/','', $_GET['dataname']);
        $data = file_get_contents('../data/'.$dataName.'.json');
        break;

    case '/view': 
        array_push($headers, 'Content-Type: text/html');
        $viewName = preg_replace('/[^a-zA-Z0-9\-_]/','', $_GET['viewname']);
        $data = file_get_contents('../view/' . $viewName . '.html');
        break;
};

// output
foreach($headers as $h){
    echo header($h);
}

echo $data;