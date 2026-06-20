import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import UpdateTaskApi from "../apis/UpdateTaskApi"
import "../styling/EditTask.css"

const EditTask = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const { _id, name, description, status } = location.state

    const [tname, setName] = useState(name)
    const [tdescription, setDescription] = useState(description)
    const [tstatus, setStatus] = useState(status)

    const updateTask = async () => {

        try {

            if (tname === "") {
                alert("Task name cannot be empty!")
            }

            else if (tdescription === "") {
                alert("Description cannot be empty!")
            }

            else {

                const data = await UpdateTaskApi(
                    _id,
                    tname,
                    tdescription,
                    tstatus
                )

                alert(data.message)

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
        <div className="editContainer">

            <div className="editCard">

                <h1>Edit Task</h1>

                <input
                    type="text"
                    placeholder="Task Name"
                    value={tname}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={tdescription}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    value={tstatus}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <button onClick={updateTask}>
                    Update Task
                </button>

            </div>

        </div>
    )
}

export default EditTask