import axios from "axios"
import Cookies from "js-cookie"

const AddTaskApi=async(name,description)=>{
        const jwtToken=Cookies.get("jwtToken")
        const options={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${jwtToken}`
            }
        }
            const date = new Date().toISOString().split("T")[0]
            const status="pending"
        const response=await axios.post("http://localhost:4000/addtask",{name,description,status,date},options)
        return response.data
}

export default AddTaskApi