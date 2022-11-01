import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "../pages/Home.css"
import { ColorRing } from 'react-loader-spinner'


const Home = () => {
  const [users, setUser] = useState([]);
  const [search, setSearch] = useState("")
  const [showMore, setShowMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  let history = useHistory();
  useEffect(() => {
    loadUsers();
  }, []);
  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }


  const loadUsers = async () => {
    const result = await axios.get("https://62a6bb9697b6156bff7e6251.mockapi.io/v1/apis");
    setUser(result.data);
  };


  const deleteUser = async id => {
    setIsLoading(true)
    const result = await axios.delete(`https://62a6bb9697b6156bff7e6251.mockapi.io/v1/apis/${id}`);
    loadUsers();
    if (result.statusText === "OK") {
      setIsLoading(false)
    }
  };
  const isFiltervalue = () => {
    return (
      users.filter((val) => {
        if (search === "") {
          return val
        }
        else if (val.name.toLowerCase().includes(search.toLowerCase())) {
          return val
        }
      }))
  }
  const tableData = (user) => {
    return (
      <tr>
        <th scope="row">{user.id}</th>
        <td>{user.name}</td>
        <td>{user.description}</td>
        <td>{user.email}</td>
        <td>
          <button
            class="btn btn-outline-primary mr-2"
            onClick={() => history.push({ pathname: `/users/edit/${user.id}`, state: { users: user } })}
          >
            Edit
          </button>
          <Link
            class="btn btn-danger"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </Link>
        </td>
      </tr>)
  }
  return (
    <div className="container">
      <div className="py-4">
        <div style={{
          width: "30%",
          height: "50px",
          margin: "auto"
        }}>
          <input placeholder="search" onChange={(e) => onChangeSearch(e)} />
          <button style={{ backgroundColor: '#007bff', color: "white" }}>Search Here</button>
        </div>
        <table class="table border shadow">
          <thead class="thead  -dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              isLoading &&
              <>
                <div className="loaderBox">
                  <ColorRing
                    visible={true}
                    height="80"
                    width="100"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#fff', "#fff", "#fff", "#fff", "#fff"]}
                  />
                </div>

              </>
            }

            {
              showMore ?
                isFiltervalue().slice(0, 10).map((user) => (
                  tableData(user)
                ))
                :
                isFiltervalue().map((user) => (
                  tableData(user)
                ))
            }

          </tbody>

        </table>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="showButton" onClick={() => setShowMore(!showMore)}>{showMore ? "show more >>" : "show less <<"}</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
