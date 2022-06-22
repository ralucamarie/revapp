<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


include_once '../../config/database.php';
include_once '../../models/user.php';
include_once '../../models/role.php';
include_once '../../models/address.php';

$database = new Database();
$db = $database->getConnection();

$users = new User($db);
$address = new Address($db);
$role = new Role($db);

$stmt = $users->getUsers();
$itemCount = $stmt->rowCount();

if ($itemCount > 0) {

    $userArr = array();


    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $address->id = $address_ID;
        $address->getSingleAddress();
        $role->id = $role_ID;
        $role->getSingleRole();


        $oneUser = array(
            "id" => $id,
            "name" => $name, 
            "surname" => $surname,
            "email" => $email,
            "role" => $role->role_name,
            "city" => $address->city,
            "country" => "$address->country",
        );
        array_push($userArr, $oneUser);
    }
    echo json_encode($userArr);
} else {
    echo json_encode("");
}