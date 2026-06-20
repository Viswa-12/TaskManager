import axios from "axios"

const SignupApi=async(name,email,password)=>{
    const options={
         headers: {
        "Content-Type": "application/json",
            },
    }
    const response=await axios.post("http://localhost:4000/signup",{name,email,password},options)
    return response.data
}

export default SignupApi