import axios from "axios"
import Cookies from "js-cookie"

const DeleteTaskApi = async (id) => {

    const jwtToken = Cookies.get("jwtToken")

    const response = await axios.delete(
        `http://localhost:4000/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        }
    )

    return response.data
}

export default DeleteTaskApi