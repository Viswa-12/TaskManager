import axios from "axios"

const LoginApi=async(email,password)=>{
    const options={
         headers: {
        "Content-Type": "application/json",
            },
    }
    const response=await axios.post("http://localhost:4000/login",{email,password},options)
    return response.data
}

export default LoginApi