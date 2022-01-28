import { createContext, useEffect, useState } from "react";
import UserData from "../Data/UserServices";
import React from "react";
import { toast } from "react-toastify";
import ToastMessage from "../components/common/Toast";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getIndex = (id) => users.findIndex((u) => u.id === id);

  const getALlUser = () => {
    const users = UserData.getALl();
    setUsers(users);
  };

  const getUser = (id) => {
    const index = getIndex(id);
    return { ...users[index] };
  };

  const handleCreateUser = (newUser) => {
    const prevUsers = users;
    const addInfo = {
      id: UserData.genId().next().value,
      skill: [],
      profile: [],
    };
    const newUsers = [{ ...addInfo, ...newUser }, ...users];
    setUsers(newUsers);
    UserData.update(newUsers);
    toast.success(
      <ToastMessage
        messaage={"Created The User"}
        onUndo={() => setUsers(prevUsers)}
      />
    );
  };
  const handleUpdateUser = (id, user, message) => {
    const prevUsers = users;
    const newUsers = [...users];
    const index = getIndex(id);
    newUsers[index] = { ...newUsers[index], ...user };
    setUsers(newUsers);
    toast.info(
      <ToastMessage
        messaage={message || "Updated The User"}
        onUndo={() => setUsers(prevUsers)}
      />
    );
  };
  const handleDeleteUser = (id) => {
    const prevUsers = users;
    const newUsers = [...users];
    const index = getIndex(id);
    newUsers.splice(index, 1);
    setUsers(newUsers);
    UserData.update(newUsers);
    toast.error(
      <ToastMessage
        messaage={"Deleted The User"}
        onUndo={() => setUsers(prevUsers)}
      />
    );
  };

  useEffect(() => {
    getALlUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        getAll: getALlUser,
        getById: getUser,
        onCreate: handleCreateUser,
        onUpdate: handleUpdateUser,
        onDelete: handleDeleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
