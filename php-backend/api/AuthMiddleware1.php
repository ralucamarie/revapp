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

    public function isValid(?array $permissions)
    {

        if ($permissions[0] == 0){
            $success_array["execute"] = true;
//            echo "Permissions are for everybody\n";
            return $success_array;
        }
        else $success_array["execute"] = false;
//        echo "Checking for Authorization\n";
        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {
            $data = $this->jwtDecodeData($matches[1]);
//            echo "Data ran trough decoding\n";
//            $user = new User($this->db);
//            if(isset($data['data']->user_id))
//                $user->id = $data['data']->user_id;
            if (
//                $user->getSingleUser()
                isset($data['data']->user_id) &&
                $user = $this->fetchUser($data['data']->user_id)
            ) : {
//                echo "Setting user\n";
                $success_array["success"] = 1;
                $success_array["user"] = $user;
            }
            else : {
//                echo "Something Happened\n";
                $success_array["success"] = 0;
                $success_array["message"] = $data['message'];
            }
            endif;
        } else {
//            echo "There is no token\n";
            $success_array["success"] = 0;
            $success_array["message"] = "Token not found in request";
        }
        // Incercand sa adaugam autorizare de executie pe endpointuri GET, DELETE, POST, UPDATE
//        echo "Checking Permissions\n";
        foreach($permissions as $permission){
            if (isset($user) && $permission == $user['role_ID'])
                $success_array["execute"] = true;
        }
//        echo "Returning array " . json_encode($success_array["execute"]);
        return $success_array;
    }

    protected function fetchUser($user_id)
    {
        try {
            $fetch_user_by_id = "SELECT `id`,`name`,`surname`,`email`,`address_ID`,`role_ID` FROM `user` WHERE `id`=:id";
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