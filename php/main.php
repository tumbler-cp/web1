<?php
$start = microtime();
$x = $_POST['x'];
$y = $_POST['y'];
$r = $_POST['r'];

if (!is_numeric($x) || !is_numeric($y) || !is_numeric($r)){
    http_response_code(400);
    return;
}

function check($x, $y, $r)
{
    return (($x >= 0) && ($y >= 0) && ($x ** 2 + $y ** 2 <= $r / 2 ** 2))
        || (($x <= 0) && ($x >= -$r / 2) && ($y >= 0) && ($y <= $r))
        || (($x <= 0) && ($x >= -$r) && ($y <= 0) && ($y >= -$r) && ($y >= -$x - $r));
}

date_default_timezone_set('Europe/Moscow');

$finish = microtime() - $start;
$res = ['x' => $x,'y' => $y,'r' => $r,'curr_time' => date("H:i:s"),'exec_time'=> $finish,'resp'=> check($x, $y, $r)];

echo json_encode($res);