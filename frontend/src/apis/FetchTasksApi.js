import axios from "axios"
import Cookies from "js-cookie"

const FetchTasksApi=async()=>{
    const jwtToken=Cookies.get("jwtToken")
    const options={
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${jwtToken}`
        }
    }
    const response=await axios.get("http://localhost:4000/tasks",options)
    return response.data
}

export default FetchTasksApi