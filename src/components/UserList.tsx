import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import { CardBackground } from "./Layout";
import { addUser, setLoading } from "../redux/user/userSlice";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.users);

  const fetchUsers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      users.forEach((user: any) => dispatch(addUser(user)));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
        dispatch(setLoading(false)); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, users.length]);

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