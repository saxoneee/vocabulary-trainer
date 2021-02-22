<?php 
$scriptBase = str_replace(DIRECTORY_SEPARATOR, '/', dirname($_SERVER['SCRIPT_NAME']));
$apiPath = substr($_SERVER['REQUEST_URI'], strlen($scriptBase));
$apiPath = ($apiPath[0] != '/') ? '/' . $apiPath : $apiPath;
$apiPath = (strpos($apiPath,'?') !== false) ? substr($apiPath,0,strpos($apiPath,'?')) : $apiPath;
$headers = [];
$data = null;
$dataPath = './../data';

switch($apiPath){
    case '/datalist': 
        $handle = opendir($dataPath);
        $listToReturn = [];
        while($item = readdir($handle)){
            $file = $dataPath . '/' . $item;
            if(is_file($file)){
                $fileData = json_decode(file_get_contents($file));

                $listToReturn[]= [
                    "id" => $item,
                    "name" => $fileData->meta->name
                ];
                
            }
        }
        closedir($handle);

        array_push($headers, 'Content-Type: application/json');
        $data = json_encode($listToReturn);
        break;
    case '/data': 
        array_push($headers, 'Content-Type: application/json');
        $dataName = preg_replace('/[^a-zA-Z0-9\-_.]/','', $_GET['dataname']);
        $content = json_decode(file_get_contents('../data/'.$dataName));
        $data = json_encode($content->data);
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