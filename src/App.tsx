import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";
import { User } from "./utils/types";
import data from "./utils/celebrities.json";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const processedUsers = data.map((user) => {
      const age = new Date().getFullYear() - new Date(user.dob).getFullYear();
      return { ...user, age };
    });
    setUsers(processedUsers);
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.first} ${user.last}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-4">
        FactWise Assessment
      </h1>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <UserList users={filteredUsers} setUsers={setUsers} />
    </div>
  );
};

export default App;
