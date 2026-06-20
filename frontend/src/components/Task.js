import { useNavigate } from "react-router-dom"
import DeleteTaskApi from "../apis/DeleteTaskApi"
import "../styling/Task.css"

const Task = ({ _id, name, description, status, date }) => {

    const navigate = useNavigate()

    // UPDATE TASK
    const updateRequest = () => {

        navigate(`/update/${_id}`, {
            state: {
                _id,
                name,
                description,
                status
            }
        })
    }

    // DELETE TASK
    const deleteTask = async () => {

        try {

            const confirmDelete = window.confirm(
                "Are you sure you want to delete this task?"
            )

            if (!confirmDelete) {
                return
            }

            const data = await DeleteTaskApi(_id)

            alert(data.message)

            // refresh page
            window.location.reload()

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
        <div className="taskContainer">

            <div className="taskInfoContainer">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>

            <h3>{status}</h3>

            <h3>
                {new Date(date).toLocaleDateString()}
            </h3>

            <button
                className="editBtn"
                onClick={updateRequest}
            >
                Edit
            </button>

            <button
                className="deleteBtn"
                onClick={deleteTask}
            >
                Delete
            </button>

        </div>
    )
}

export default Task