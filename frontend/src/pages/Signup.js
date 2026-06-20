import {  useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom"
import SignupApi from "../apis/SignupApi";

import "../styling/Form.css"

const Signup=()=>{
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [nameErr,setNameError]=useState("")
    const [emailErr,setEmailErr]=useState("")
    const [passwordErr,setPasswordErr]=useState("")
    const signRequest=async()=>{
        const data=await SignupApi(name,email,password)
        if(data.status){
            alert(data.message)
            navigate("/login")
        }
        else{
            alert(data.message)
        }
    }
    return (
        <div className="signFormContainer">
            <div className="signForm">
                <h1 className="formHeading">Sign up</h1>
                <div className="inputContainer">
                <div className="userInputContainer">
                <FaUser className="inputIcon" />
                <input type="text" className="userInput" placeholder="Username..." onChange={(e)=>{setName(e.target.value)}} value={name}
                onBlur={()=>{if(name==""){
                    setNameError("Username cannot be empty!!")
                }
            else{
                    setNameError("")
                }
            }}
                />
                </div>
                {nameErr && <p className="errorMsg">{nameErr}</p>}
                </div>
                                <div className="inputContainer">
                <div className="userInputContainer">
                <MdEmail className="inputIcon" />
                <input type="email" className="userInput" placeholder="Email..." onChange={(e)=>{setEmail(e.target.value)}} value={email}
                onBlur={()=>{if(email==""){
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
                        <button type="button" className="signBtn" onClick={()=>{signRequest()}}>Sign up</button>
                </div>
                <p className="formMsg">Already have an account?  <Link className="formLink" to="/login">Sign in</Link> </p>
            </div>
        </div>
    )
}

export default Signup