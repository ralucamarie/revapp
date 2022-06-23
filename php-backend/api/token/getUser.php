<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../api/AuthMiddleware1.php';
include_once '../permissions.php';

$allHeaders = getallheaders();
$db_connection = new Database();
$db = $db_connection->getConnection();
$auth = new Auth($db, $allHeaders);


$permissions = MODERATOR;

if($auth->isValid($permissions)["execute"])
echo json_encode($auth->isValid($permissions));
else echo json_encode("You do not have Authorization");

