<?php
class User
{

    // conn
    private $conn;

    // table
    private $dbTable = "user";

    // col
    public $id;
    public $name;
    public $surname;
    public $address_ID;
    public $role_ID;
    public $email;

    public $password;

    // db conn
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // GET Users
    public function getUsers()
    {
        //trebuie create Models for each table in the DB - and added the required models here. Plus we need to add the table names dynamically in the bellow query:
        $sqlQuery = "SELECT U.id, U.name, U.surname, U.email, A.city, A.country, R.role_name FROM user U, addresses A, role R WHERE U.address_ID=A.id AND U.role_ID=R.id";
        // $sqlQuery = "SELECT id, name, surname, address_ID, role_ID, email
        //    FROM " . $this->dbTable . "";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

    // CREATE User
    public function createUser()
    {
        $sqlQuery = "INSERT INTO
                        " . $this->dbTable . "
                    SET
                    name = :name, 
                    surname = :surname, 
                    email = :email";

        $stmt = $this->conn->prepare($sqlQuery);

        // sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind data
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surname", $this->surname);
        $stmt->bindParam(":email", $this->email);


        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // GET User
    public function getSingleUser()
    {
        $sqlQuery = "SELECT
                    id, 
                    name, 
                    surname, 
                    email
                  FROM
                    " . $this->dbTable . "
                WHERE 
                   id = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name = $dataRow['name'];
        $this->surname = $dataRow['surname'];
        $this->email = $dataRow['email'];
    }


    // UPDATE User
    public function updateUser()
    {
        $sqlQuery = "UPDATE
                        " . $this->dbTable . "
                    SET
                    name = :name, 
                    surname = :surname, 
                    email = :email
                    WHERE 
                        id = :id";

        $stmt = $this->conn->prepare($sqlQuery);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->surname = htmlspecialchars(strip_tags($this->surname));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // bind data
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":surname", $this->surname);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // DELETE User
    function deleteUser()
    {
        $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE id = ?";
        $stmt = $this->conn->prepare($sqlQuery);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
