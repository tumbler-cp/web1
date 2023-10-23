<?php
$start = microtime();

if ($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    return;
}

$x = $_POST['x'];
$y = $_POST['y'];
$r = $_POST['r'];
$clean = $_POST['clean'];

if ($clean === '1') {
    session_start();
    session_destroy();
    echo '';
    return;
}

if (!is_numeric($x) || !is_numeric($y) || !is_numeric($r)) {
    http_response_code(415);
    return;
}

if ($x < -5 || $x > 3 || abs($y) > 4 || $r < 1 || $r > 3){
    http_response_code(400);
    return;
}

if (!in_array($y, [-4, -3, -2, -1, 0, 1, 2, 3, 4]) || !in_array($r, [1, 1.5, 2, 2.5, 3])){
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

if (!isset($_SESSION)) {
    session_start();
}

if (!isset($_SESSION['client'])) {
    $_SESSION['client'] = array();
}

$_SESSION['client'][] = array($x, $y, $r,
    date('H:i:s'),
    number_format($finish * 100000, 3) . 'ms',
    check($x, $y, $r) ? 'HIT' : 'MISS');

include 'table.php';
