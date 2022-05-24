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
        public $role_ID;
        public $address_ID;
        public $email;
        public $password;
      
        // db conn
        public function __construct($db){
            $this->conn = $db;
        }

        // GET Users
        public function getUsers(){
            $sqlQuery = "SELECT id, first_name, last_name, role_ID, address_ID, email, password
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
                    role_ID = :role_ID;
                    address_ID = :address_ID;
                    email = :email;
                    password = :password";
                  
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->first_name=htmlspecialchars(strip_tags($this->first_name));
            $this->last_name=htmlspecialchars(strip_tags($this->last_name));
            $this->role_ID=htmlspecialchars(strip_tags($this->role_ID));  
            $this->address_ID=htmlspecialchars(strip_tags($this->address_ID));
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));   
            // bind data
            $stmt->bindParam(":first_name", $this->first_name);
            $stmt->bindParam(":last_name", $this->last_name);
            $stmt->bindParam(":address_ID", $this->address_ID);
            $stmt->bindParam(":role_ID", $this->role_ID);
            $stmt->bindParam(":email", $this->email);
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
                       address_ID,
                       role_ID, 
                       email,
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
           $this->address_ID = $dataRow['address_ID'];
           $this->role_ID = $dataRow['role_ID'];
           $this->email = $dataRow['email'];
           $this->password = $dataRow['password'];
    }

        

        // UPDATE User
        public function updateUser(){
            $sqlQuery = "UPDATE ". $this->dbTable ." 
                    SET 
                        first_name = :first_name, 
                        last_name = :last_name,
                        role_ID = :role_ID,
                        address_ID = :address_ID,
                        email = :email,
                        password = :password
                    WHERE 
                        id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->first_name=htmlspecialchars(strip_tags($this->first_name));
            $this->last_name=htmlspecialchars(strip_tags($this->last_name));
            $this->role_ID=htmlspecialchars(strip_tags($this->role_ID));
            $this->address_ID=htmlspecialchars(strip_tags($this->address_ID));
            $this->email=htmlspecialchars(strip_tags($this->email));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":first_name", $this->first_name);
            $stmt->bindParam(":last_name", $this->last_name);
            $stmt->bindParam(":role_ID", $this->role_ID);
            $stmt->bindParam(":address_ID", $this->address_ID);
            $stmt->bindParam(":email", $this->email);
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
