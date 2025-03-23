import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser, User } from "../redux/user/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FormBackground } from "./Layout";
import { RootState } from "../redux/store";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const { users } = useSelector((state: RootState) => state.users);
  
  const [user, setUser] = useState({ id: id ? Number(id) : users.length, name: "", email: "", address: { street: "", city: "" } });

//   // Mutation for adding a user
//   const mutation = useMutation({
//     mutationFn: (newUser) => Promise.resolve(newUser), // Simulated mutation (no API call)
//     onSuccess: (data) => {
//       dispatch(addUser({ id: Date.now(), ...data })); // Add to Redux state
//       queryClient.invalidateQueries(["users"]); // Invalidate and refetch user list
//     },
//   });

    useEffect(() => {
        if (id) {
            const existingUser = users.find((user: User) => user.id === Number(id));
            if (existingUser) {
                setUser(existingUser);
            }
        }
    }, [id, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    id ? dispatch(updateUser(user)) : dispatch(addUser(user));
    navigate("/users");
  };
  
//   useEffect(() => {
//     if (isSubmitted) {
//         // navigate("/users");
//     }
//   }, [isSubmitted, navigate]);

  return (
    <>
        <h1>{id ? "Update" : "Add"} User</h1>
        
        <FormBackground>
            <form onSubmit={handleSubmit} className="addUserForm">
                <label htmlFor=""><span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><circle cx="24" cy="11" r="7"/><path d="M4 41c0-8.837 8.059-16 18-16m9 17l10-10l-4-4l-10 10v4z"/></g></svg></span>Name</label>
                <input type="text" placeholder="Name"
                    value={user.name} onChange={(e) => setUser({ 
                        ...user, name: e.target.value })} required 
                />
                <label htmlFor=""><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7m18 0a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1m18 0l-7.72 6.433a2 2 0 0 1-2.56 0L3 7"/></svg></span>Email</label>
                <input type="email" placeholder="Email" 
                    value={user.email} onChange={(e) => setUser({ 
                        ...user, email: e.target.value 
                    })} required 
                />
                <label htmlFor=""><span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15"><path fill="currentColor" d="M5 2.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0M7.5 6A3.5 3.5 0 0 0 4 9.5v2a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-2A3.5 3.5 0 0 0 7.5 6"/><path fill="currentColor" d="M1.394 10.695c-.283.292-.394.563-.394.805c0 .245.114.52.406.816c.294.299.745.59 1.341.846c1.191.51 2.871.838 4.753.838s3.562-.328 4.753-.838c.596-.256 1.047-.547 1.341-.846c.292-.296.406-.57.406-.816c0-.242-.11-.513-.395-.805c-.285-.294-.724-.582-1.305-.837l.4-.916c.656.287 1.218.64 1.622 1.056c.407.418.678.927.678 1.502c0 .583-.278 1.097-.694 1.519c-.414.42-.989.774-1.66 1.062c-1.342.575-3.162.919-5.146.919s-3.804-.344-5.147-.92c-.67-.287-1.245-.642-1.659-1.061c-.416-.422-.694-.936-.694-1.52c0-.575.27-1.083.678-1.501c.404-.416.966-.769 1.622-1.056l.4.916c-.581.255-1.02.543-1.306.837"/></svg></span>Street</label>
                <input type="text" placeholder="Street" 
                    value={user.address.street} onChange={(e) => setUser({ 
                        ...user, address: { ...user.address, street: e.target.value } 
                    })} 
                />
                <label htmlFor=""><span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 100 100"><path fill="currentColor" d="M50.001 0C33.65 0 20.25 13.36 20.25 29.666c0 6.318 2.018 12.19 5.433 17.016L46.37 82.445c2.897 3.785 4.823 3.066 7.232-.2l22.818-38.83c.46-.834.822-1.722 1.137-2.629a29.3 29.3 0 0 0 2.192-11.12C79.75 13.36 66.354 0 50.001 0m0 13.9c8.806 0 15.808 6.986 15.808 15.766S58.807 45.43 50.001 45.43c-8.805 0-15.81-6.982-15.81-15.763S41.196 13.901 50 13.901"/><path fill="currentColor" d="m68.913 48.908l-.048.126l.042-.115zM34.006 69.057C19.88 71.053 10 75.828 10 82.857C10 92.325 26.508 100 50 100s40-7.675 40-17.143c0-7.029-9.879-11.804-24.004-13.8l-1.957 3.332C74.685 73.866 82 76.97 82 80.572c0 5.05-14.327 9.143-32 9.143s-32-4.093-32-9.143c-.001-3.59 7.266-6.691 17.945-8.174z" color="currentColor"/></svg></span>City</label>
                <input type="text" placeholder="City" 
                    value={user.address.city} onChange={(e) => setUser({ 
                        ...user, address: { ...user.address, city: e.target.value } 
                    })} 
                />
                {/* <button type="submit"> {mutation.isLoading ? "Adding..." : "Submit"} User</button> */}
                <button type="submit"> { id ? "Update" : "Add"} User</button>
            </form>
        </FormBackground>
    </>
  );
};

export default UserForm;