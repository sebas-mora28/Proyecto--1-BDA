import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "../src/views/Login";
import RegisterUser from "../src/views/UserViews/RegisterUser";
import Navbar from "../src/components/Navbar";
import RegisterAdmin from "../src/views/AdminViews/RegisterAdmin";
import AdminHome from "./views/AdminViews/AdminHome";
import Top5Clubs from "./views/AdminViews/Top5Clubs";
import Bottom3Clubs from "./views/AdminViews/Bottom3Clubs";
import StudentMoreSuggestions from "./views/AdminViews/StudentMoreSuggestions";
import ClubsByCategory from "./views/AdminViews/ClubsByCategory";
import MyClubs from "./views/UserViews/MyClubs";
import RegisterClub from "./views/UserViews/RegisterClub";
import {UserContext} from './utils/auth'
import { useEffect, useState } from "react";


function App() {

  const [user, setUser] = useState({});
  const value = {user, setUser}

  useEffect(() => {
    console.log("user: ", user)
  }, [user])

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login/>}  />
          <Route path="/login" element={<Login/>}  />
          <Route path="/register-user" element={<RegisterUser/>} />
          <Route path="/register-admin" element={<RegisterAdmin/>} />
          <Route path="/admin/home" element={<AdminHome/>} />
          <Route path="/admin/top5-clubs" element={<Top5Clubs/>} />
          <Route path="/admin/bottom3-clubs" element={<Bottom3Clubs/>} />
          <Route path="/admin/student-more-suggestions" element={<StudentMoreSuggestions/>} />
          <Route path="/admin/clubs-by-category" element={<ClubsByCategory/>} />
          <Route path="/user/my-clubs" element={<MyClubs/>} />
          <Route path="/user/register-club" element={<RegisterClub/>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
