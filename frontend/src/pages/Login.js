import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom"
import LoginApi from "../apis/LoginApi";
import Cookies from "js-cookie"

import "../styling/Form.css"

const Login=()=>{
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [emailErr,setEmailErr]=useState("")
    const [passwordErr,setPasswordErr]=useState("")
   const loginRequest = async () => {

    try {

        const data = await LoginApi(email, password)
        
        if (data.status) {


            Cookies.set("jwtToken", data.jwtToken, {
                expires: 30
            })

            Cookies.set("username", data.username, {
                expires: 30
            })

            navigate("/")
        }

    } catch (err) {

        if (err.response) {
            alert(err.response.data.message)
            
        }
        else {
            alert("Server not responding!")
             
        }
    }
}
    return (
        <div className="signFormContainer">
            <div className="signForm">
                <h1 className="formHeading">Sign in</h1>
                <div className="inputContainer">
                <div className="userInputContainer">
                <MdEmail className="inputIcon" />
                <input type="email" className="userInput" placeholder="Email..." onChange={(e)=>{setEmail(e.target.value)}} value={email}
                onBlur={()=>{if(email===""){
                    setEmailErr("Email cannot be empty!!")
                }
            else{
                    setEmailErr("")
                }
            }
                }
                />
                </div>
                {emailErr && <p className="errorMsg">{emailErr}</p>}
                </div>
                                <div className="inputContainer">
                <div className="userInputContainer">
                <FaLock className="inputIcon"/>
                <input type="password" className="userInput" placeholder="Password..." onBlur={()=>{if(password==""){
                    setPasswordErr("Password cannot be empty!!")
                }
                else if(password.length<8){
                    setPasswordErr("Password length minimum should be 8...")
                }
            else{
                    setPasswordErr("")
                }
            }
                } onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                </div>
                {passwordErr && <p className="errorMsg">{passwordErr}</p>}
                </div>
                <div className="signBtnContainer">
                        <button type="button" className="signBtn" onClick={()=>{loginRequest()}}>Sign in</button>
                </div>
                <p className="formMsg">Don't have an account?  <Link className="formLink" to="/signup">Sign up</Link> </p>
            </div>
        </div>
    )
}

export default Login