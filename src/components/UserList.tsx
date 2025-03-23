import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/user/userSlice";
import { RootState, AppDispatch } from "../redux/store";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import { CardBackground } from "./Layout";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="main">
      <h1>User List</h1>
      
      <div className="userlist">
        <CardBackground>
            <Link to="/add-user">
                <div className="add-user">
                    <button><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .75.75v4.75h4.75a.75.75 0 0 1 0 1.5H8.75v4.75a.75.75 0 0 1-1.5 0V8.75H2.5a.75.75 0 0 1 0-1.5h4.75V2.5A.75.75 0 0 1 8 1.75" clip-rule="evenodd"/></svg></button>
                    <h2>Add User</h2>
                </div>
            </Link>
        </CardBackground>
        {loading ? <p>Loading...</p> : users.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default UserList;