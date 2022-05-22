<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../models/user.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$item = new User($db);
// $userAddress = new Address($db);
// $userRole = new Role($db);

$data = json_decode(file_get_contents("php://input"));

$item->name = $data->name;
$item->surname = $data->surname;
$item->email = $data->email;
$item->password = $data->password;

// $userAddress->city = $data->city;
// $userAddress->country = $data->country;

// $userRole->role_name = $data->role_name;

//Se verifica userRole in baza de date si se ia role_ID din tabelul ROLES
//Se asigneaza id-ul obtinut la $item->role_ID
//Se cauta city + country in baza de date - daca exista se ia id-ul si se asigneaza la $item - > address_ID; Daca nu exista, se adauga si n baza de date si se retine id-ul care la fel se adauga la item.

//Cand item-ul e complet se adauga in baza de date


//TODO: Create the model for the Address and for the Role. 
//the USER model contains adderss_ID and role_ID. Therefore we need to create 2 objects - Role and Address, and use them whenever we add a new user.
//when a new user is added - search in the DB for the address and Country. If they are not added, add new ADDRESS, else get the adderss_id and assign it to the USER object
//with the role, assign the USER object the id of the user name received from the frontend.
if ($item->createUser()) {
    echo json_encode("User created.");
} else {
    echo json_encode("Failed to create user.");
}
