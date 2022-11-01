import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const EditUser = () => {
  let history = useHistory();
  const [users, setUsers] = useState({});
  useEffect(() => {
    console.log(history.location.state.users, "history.location.state.users")
    setUsers(history.location.state.users)
  }, [])

  const onInputChange = e => {
    setUsers({
      ...users,
      description: e.target.value
    });
  };
  console.log(users, "description")
  const onSubmit = async e => {
    e.preventDefault();
    await Axios.post("https://62a6bb9697b6156bff7e6251.mockapi.io/v1/apis", users);
    history.push("/");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Description</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Edit your Description"
              name="name"
              value={users.description}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Description</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
