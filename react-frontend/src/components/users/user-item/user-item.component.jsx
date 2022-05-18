import "./user-item.styles.css";

const UserItem = (user) => {
  const { first_name, last_name, email_id } = user.user;

  return (
    <div className="user-item-container">
      <div className="user-details">
        <div>{first_name}</div>
        <div>{last_name}</div>
        <div>{email_id}</div>
      </div>
      <div className="buttons">
        <button
          //   onClick={() => this.editUser(user.id)}
          className="btn btn-warning"
        >
          Update
        </button>
        <button
          style={{ marginLeft: "10px" }}
          //   onClick={() => this.deleteUser(user.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
        <button
          style={{ marginLeft: "10px" }}
          //   onClick={() => this.viewUser(user.id)}
          className="btn btn-info"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default UserItem;
