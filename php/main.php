<?php
$start = microtime();

if ($_SERVER["REQUEST_METHOD" !== "POST"]){
    http_response_code(405);
    return;
}

$x = $_POST['x'];
$y = $_POST['y'];
$r = $_POST['r'];

if (!is_numeric($x) || !is_numeric($y) || !is_numeric($r)) {
    http_response_code(422);
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

$result = array($x, $y, $r,
    date("H:i:s"),
    number_format($finish * 100000, 3) . "ms",
    check($x, $y, $r) ? 'HIT' : 'MISS');

if (!isset($_SESSION)) {
    session_start();
}

if (!isset($_SESSION['client'])) {
    $_SESSION['client'] = array();
}

$_SESSION['client'][] = $result;

$table = include "table.php";

echo $table;