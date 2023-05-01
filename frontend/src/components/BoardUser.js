import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventBus from "../common/EventBus";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
        {/* <h3>{content}</h3> */}
        <div className="container">
          <div className="card">
            <div className="card-title">
              <h2>Employee Listing</h2>
            </div>
            <div className="card-body">
              <div className="divbtn">
                <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
              </div>
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {content &&
                    content.map(item => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                          </td>
                        </tr>
                    ))
                }
                </tbody>

              </table>
            </div>
          </div>
        </div>
    </div>
  );
};

export default BoardUser;
