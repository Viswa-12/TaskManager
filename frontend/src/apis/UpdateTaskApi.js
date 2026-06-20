import Cookies from "js-cookie"
import axios from "axios"

const UpdateTaskApi=async(_id,name,description,status)=>{
    const jwtToken=Cookies.get("jwtToken")
    const options={
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${jwtToken}`
        }
    }
    const response=await axios.put(`http://localhost:4000/update/${_id}`,{name,description,status},options)
    return response.data
}

export default UpdateTaskApi