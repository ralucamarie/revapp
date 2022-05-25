<?php
class Role
{
    private $conn;

    // table
    private $dbTable = "role";

    // col
    public $id;
    public $role_name;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getRoles()
    {
        $sqlQuery = "SELECT * FROM " . $this->dbTable;
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

    // CREATE Address
    public function createRole()
    {
        $sqlQuery = "INSERT INTO
                        " . $this->dbTable . "
                    SET
                    role_name = :role_name";

        $stmt = $this->conn->prepare($sqlQuery);

        // sanitize
        $this->role_name = htmlspecialchars(strip_tags($this->role_name));

        // bind data
        $stmt->bindParam(":role_name", $this->role_name);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // GET Address
    public function getSingleRole()
    {
        $sqlQuery = "SELECT
                    id, 
                    role_name 
                  FROM
                    " . $this->dbTable . "
                WHERE 
                   id = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->role_name = $dataRow['role_name'];
    }
    public function getRoleIdByRoleName()
    {
        $sqlQuery = "SELECT
                    id, 
                    role_name 
                  FROM
                    " . $this->dbTable . "
                WHERE 
                   role_name = :role_name LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);
        // $stmt->bind_param('sssd', $code, $language, $official, $percent);
        $stmt->bindParam(":role_name", $this->role_name, PDO::PARAM_STR);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $dataRow['id'];
    }

    //UPDATE Role
    public function updateRole()
    {
        $sqlQuery = "UPDATE
                        " . $this->dbTable . "
                    SET
                    role_name = :role_name, 
                    
                    WHERE 
                        id = :id";

        $stmt = $this->conn->prepare($sqlQuery);

        $this->role_name = htmlspecialchars(strip_tags($this->role_name));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // bind data
        $stmt->bindParam(":role_name", $this->role_name);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    //DELETE Role
    function deleteRole()
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
