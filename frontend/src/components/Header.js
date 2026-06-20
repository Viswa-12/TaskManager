import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import "../styling/Header.css"

const Header=()=>{
    const username=Cookies.get("username")
    const navigate=useNavigate()
    const Logout=()=>{
        Cookies.remove("jwtToken")
        navigate("/login")
    }
    return (
        <div className="headerContainer">
            <h2 className="appLogo">Task Manager</h2>
            <div className="headerInfo">
                <h4>Hello <span className="username">{username} !</span></h4>
                <button type="button" onClick={()=>{Logout()}}>Logout</button>
            </div>
        </div>
    )
}

export default Header