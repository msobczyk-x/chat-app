import React, {useState, useEffect} from "react";
import "./App.css";
import Main from "./components/main/Main";
import HomePage from "./components/login/HomePage";

const checkUserLoggedIn = () => {
  const token = localStorage.getItem("username");
  if (token) {
    return true;
  }
  return false;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(checkUserLoggedIn());
  const [username, setUsername] = useState("");

  useEffect(() => {
    
  }
  )

  return (
    <div className="App w-auto h-screen overflow-auto  ">
      <div className="chat-app w-auto ">
        {isLoggedIn ? <Main /> : <HomePage />}
        
      </div>
    </div>
  );
}

export default App;
