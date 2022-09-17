import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "../src/views/Login";
import Register from "../src/views/Register";
import Navbar from "../src/components/Navbar";

function App() {
  return (

    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}  />
        <Route path="/register" element={<Register/>} />
      </Routes>

    </Router>

  );
}

export default App;
