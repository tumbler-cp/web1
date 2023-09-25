<?php
$start = microtime();
$x = $_POST['x'];
$y = $_POST['y'];
$r = $_POST['r'];

function check($x, $y, $r)
{
    return (($x >= 0) && ($y >= 0) && ($x ** 2 + $y ** 2 <= $r / 2 ** 2))
        || (($x <= 0) && ($x >= -$r / 2) && ($y >= 0) && ($y <= $r))
        || (($x <= 0) && ($x >= -$r) && ($y <= 0) && ($y >= -$r) && ($y >= -$x - $r));
}

date_default_timezone_set('Europe/Moscow');

if (!isset($_SESSION["client"])) $_SESSION["client"] = array();

$response = check($x, $y, $r);
$glob_time = date("H:i:s");
$finish = number_format(microtime() - $start);

$res = array($x, $y, $r, $finish, $glob_time, $response);
$_SESSION["client"][] = $res;

echo "Hello, World!";

include "addRow.php";
?>
