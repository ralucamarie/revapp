<?php
require __DIR__ . '/token/classes/JwtHandler.php';
//include_once '../models/user.php';

class Auth extends JwtHandler
{
    protected $db;
    protected $headers;
    protected $token;


    public function __construct($db, $headers)
    {
        parent::__construct();
        $this->db = $db;
        $this->headers = $headers;
    }

    public function isValid(?int $permission = 0)
    {

        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $success_array = [];
            $data = $this->jwtDecodeData($matches[1]);
//            $user = new User($this->db);
//            if(isset($data['data']->user_id))
//                $user->id = $data['data']->user_id;
            if (
//                $user->getSingleUser()
                isset($data['data']->user_id) &&
                $user = $this->fetchUser($data['data']->user_id)
            ) : {
                $success_array = [
                    "success" => 1,
                    "user" => $user
                ];
            }
            else :
                $success_array = [
                    "success" => 0,
                    "message" => $data['message'],
                ];
            endif;
        } else {
            $success_array = [
                "success" => 0,
                "message" => "Token not found in request"
            ];
        }
        // Incercand sa adaugam autorizare de executie pe endpointuri GET, DELETE, POST, UPDATE
        if ($permission == 0)
            return $success_array;
        if ($permission == $user['role_ID']){
            $success_array = [$success_array, "execute" => true];
        }
    }

    protected function fetchUser($user_id)
    {
        try {
            $fetch_user_by_id = "SELECT `name`,`email`,`role_ID` FROM `user` WHERE `id`=:id";
            $query_stmt = $this->db->prepare($fetch_user_by_id);
            $query_stmt->bindValue(':id', $user_id, PDO::PARAM_INT);
            $query_stmt->execute();

            if ($query_stmt->rowCount()) :
                return $query_stmt->fetch(PDO::FETCH_ASSOC);
            else :
                return false;
            endif;
        } catch (PDOException $e) {
            return null;
        }
    }
}