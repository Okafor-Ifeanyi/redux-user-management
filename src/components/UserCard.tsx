import React from "react";
import { User, deleteUser } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface Props {
  user: User;
}

const UserCard: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <>
        <div className="userCard">
            <svg className="profile" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 2)" stroke-width="1"><circle cx="8.5" cy="8.5" r="8"/><path d="M14.5 13.5c-.662-2.274-3.2-3.025-6-3.025c-2.727 0-5.27.869-6 3.025"/><path d="M8.5 2.5a3 3 0 0 1 3 3v2a3 3 0 0 1-6 0v-2a3 3 0 0 1 3-3"/></g></svg>
            <article className="textbody">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.address.street}, {user.address.city}</p>
                <div className="action-buttons">
                    <Link to={`/edit-user/${user.id}`}><button>Edit</button></Link>
                    <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
                </div>
                <div className="details-user"><Link to={`/users/${user.id}`} ><button>Details</button></Link></div>

            </article>
        </div>
    </>
  );
};

export default UserCard;