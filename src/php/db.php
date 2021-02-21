<?php

require('cfg/config.php');

class Db {
    public function __construct(){
        var_dump(Config::dbHost);
    }
}