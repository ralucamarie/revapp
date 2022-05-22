<?php
    class User{

        // conn
        private $conn;

        // table
        private $dbTable = "user";

        // col
        public $id;
        public $first_name;
        public $last_name;
        public $role_id;
        public $address_id;
        public $email_id;
        public $password;
      
        // db conn
        public function __construct($db){
            $this->conn = $db;
        }

        // GET Users
        public function getUsers(){
            $sqlQuery = "SELECT id, first_name, last_name, email_id, role_id, address_id, email_id, password_id
               FROM " . $this->dbTable . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // CREATE User
        public function createUser(){
            $sqlQuery = "INSERT INTO
                        ". $this->dbTable ."
                    SET
                    first_name = :first_name,
                    last_name = :first_name, 
                    role_id = :role_id;
                    address_id = :address_id;
                    email_id = :email_id;
                    password = :password";
                  
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->first_name=htmlspecialchars(strip_tags($this->first_name));
            $this->last_name=htmlspecialchars(strip_tags($this->last_name));
            $this->role_id=htmlspecialchars(strip_tags($this->role_id));  
            $this->address_id=htmlspecialchars(strip_tags($this->address_id));
            $this->email_id=htmlspecialchars(strip_tags($this->email_id));
            $this->password=htmlspecialchars(strip_tags($this->password));   
            // bind data
            $stmt->bindParam(":first_name", $this->first_name);
            $stmt->bindParam(":last_name", $this->last_name);
            $stmt->bindParam(":address_id", $this->address_id);
            $stmt->bindParam(":role_id", $this->role_id);
            $stmt->bindParam(":email_id", $this->email_id);
            $stmt->bindParam(":password",$this->password);
           
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

       // GET User
       public function getSingleUser(){
           $sqlQuery = "SELECT
                       id, 
                       first_name, 
                       last_name,
                       address_id,
                       role_id, 
                       email_id,
                       password
                     FROM
                       ". $this->dbTable ."
                   WHERE 
                      id = ?
                   LIMIT 0,1";

           $stmt = $this->conn->prepare($sqlQuery);

           $stmt->bindParam(1, $this->id);

           $stmt->execute();

           $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

           $this->first_name = $dataRow['first_name'];
           $this->last_name = $dataRow['last_name'];
           $this->address_id = $dataRow['address_id'];
           $this->role_id = $dataRow['role_id'];
           $this->email_id = $dataRow['email_id'];
           $this->password = $dataRow['password'];
    }

        

        // UPDATE User
        public function updateUser(){
            $sqlQuery = "UPDATE
                        ". $this->dbTable ."
                    SET
                    first_name = :first_name, 
                    last_name = :last_name,
                    role_id = :role_id,
                    address_id = :address_id,
                    email_id = :email_id,
                    password = :password
                    WHERE 
                        id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->first_name=htmlspecialchars(strip_tags($this->first_name));
            $this->last_name=htmlspecialchars(strip_tags($this->last_name));
            $this->role_id=htmlspecialchars(strip_tags($this->role_id));
            $this->address_id=htmlspecialchars(strip_tags($this->address_id));
            $this->email_id=htmlspecialchars(strip_tags($this->email_id));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":first_name", $this->first_name);
            $stmt->bindParam(":last_name", $this->last_name);
            $stmt->bindParam(":role_id", $this->role_id);
            $stmt->bindParam(":address_id", $this->address_id);
            $stmt->bindParam(":email_id", $this->email_id);
            $stmt->bindParam(":password", $this->password);
            $stmt->bindParam(":id", $this->id);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // DELETE User
        function deleteUser(){
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            $stmt->bindParam(1, $this->id);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

    }
?>
