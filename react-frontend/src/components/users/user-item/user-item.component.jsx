import userService from "../../../services/user.service";
import "./user-item.styles.css";

const UserItem = (props) => {
  const user = props.user;
  const { id, name, surname, email, city, country, role } = user;

  const deleteUser = (id) => {
    userService.deleteUser(id);
    props.onDelete();
  };

  return (
    <div className="user-item-container">
      <div className="user-details">
        <div>{id}</div>
        <div>{name}</div>
        <div>{surname}</div>
        <div>{email}</div>
        <div>{city}</div>
        <div>{country}</div>
        <div>{role}</div>
      </div>
      <div className="buttons">
        <button
          //   onClick={() => this.editUser(user.id)}
          className="btn btn-warning"
          onClick={() => props.onEdit(user)}
        >
          Edit
        </button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => deleteUser(user.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;
