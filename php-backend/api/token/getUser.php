<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';

//// !!!!!!! IMPORTANT NU STERGETI COMENTURILE !!!!!

include_once '../../api/AuthMiddleware1.php';
include_once '../permissions.php';
$allHeaders = getallheaders();
$db_connection = new Database();
$db = $db_connection->getConnection();
$auth = new Auth($db, $allHeaders);
$permissions = LOGGED_IN;
if($auth->isValid($permissions)["execute"])
echo json_encode($auth->isValid($permissions));
else echo json_encode("You do not have Authorization");

//include_once '../../models/user.php';
//$database = new Database();
//$db = $database->getConnection();
//
//$item = new User($db);
//
//$item->id = $_GET['id'] ?? die();
//
//$item->getSingleUser();
//
//if ($item != null) {
//    $user_Arr = array(
//        "id" =>  $item->id,
//        "name" => $item->name,
//        "surname" => $item->surname,
//        "email" => $item->email,
//        "role_ID" => $item->role_ID,
//        "address_ID" => $item->address_ID
//    );
//
//    http_response_code(200);
//    echo json_encode($user_Arr);
//} else {
//    http_response_code(404);
//    echo json_encode("User record not found.");
//}

