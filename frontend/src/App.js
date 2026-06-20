import {BrowserRouter,Routes,Route} from "react-router-dom"

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./components/UpdateTask";

const App=()=>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}  />
      <Route path="/login" element={<Login/> } />
      <Route path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      } />
      <Route path="/addtask" element={
        <ProtectedRoute>
          <AddTask/>
        </ProtectedRoute>
      } />
      <Route path="/update/:id" element={
        <ProtectedRoute>
          <EditTask/>
        </ProtectedRoute>
      } />
    </Routes>
    </BrowserRouter>
  )
}

export default App