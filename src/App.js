import React from "react";
import './App.css';
import UserList from './UserList';
import Nav from "./Nav";
import {UserProvider} from "./UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Nav />
        <UserList />
      </div>
    </UserProvider>
  );
}


export default App;
