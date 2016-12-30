<?php

$url =  $_GET['url'];
$type = $_GET['type'];

file_put_contents("../q", $url.' '.$type."\n", FILE_APPEND);