import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Welcome {currentUser.name}</strong>
        </h3>
      </header>
    </div>
  );
};

export default Profile;
