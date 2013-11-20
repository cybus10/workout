<?php
/**
 * User: Wes
 * Date: 7/14/13
 * Time: 3:25 PM
 */
error_reporting(E_ALL);
ini_set('display_errors', '1');

$pattern = $_SERVER['HTTP_HOST'] === 'cz.lh' ? '/\\\apps\\\(.*?)\\\services\\\/' : '/\/apps\/(.*?)\/services\//';
$subject = getcwd();
$matches = array();
preg_match($pattern, $subject, $matches, PREG_OFFSET_CAPTURE);
//print_r($matches);
$ward = $matches[1][0];

header('Content-type: application/json');
$input = file_get_contents('php://input');
//$input = $_GET['contact'];
$data = json_decode($input);

function bool($val) {
    return $val ? true : false;
}

function updateItem($list, $item) {
    $id = 0;
    foreach($list as $k=>$v) {
        if (intval($v->id) > $id) {
            $id = intval($v->id);
        }
        if ($v->id == $item->id) {
            foreach($item as $ck=>$cv) {
                $list[$k]->$ck = $cv; // override the value.
            }
            return $list;
        }
    }
    $id += 1;
    $item->id = $id;
    $list[] = $item;
    return $list;
}

function deleteItem($list, $item) {
    foreach($list as $k=>$v) {
        if ($v->id == $item->id) {
            unset($list[$k]);
        }
    }
    return $list;
}

function updateFile($file, $prop, $list) {
    $obj = new stdClass();
    $obj->$prop = $list;
    $result = json_encode($obj);
    file_put_contents($file, $result);
    return $result;
}

function del($file, $prop, $item) {
    $list = json_decode(file_get_contents($file))->$prop;
    $list = deleteItem($list, $item);
    $obj = new stdClass();
    $obj->$prop = $list;
    $result = json_encode($obj);
    file_put_contents($file, $result);
    return $result;
}