import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AddTaskApi from "../apis/AddTaskApi";
import "../styling/Home.css"
import "../styling/AddTask.css"

const AddTask=()=>{
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [nameErr,setNameErr]=useState("")
    const [descriptionErr,setDescriptionErr]=useState("")
    const addTaskRequest=async()=>{
        try{
            if(name===""){
                alert("Task name cannot be empty!")
            }
            else if(description===""){
                alert("Description cannot be empty!")
            }
            else if(description.length<20){
                alert("Description should be minimum of length 20.")
            }
            else{
                const data=await AddTaskApi(name,description)
            alert(data.message)
            navigate("/")
            }
        }
        catch(err){
            if (err.response) {
            alert(err.response.data.message)
        }
        else{
            alert("Error occured!")
        }
        }
    }

    return (
        <>
        <div className="container">
                    <Header/>
            <div className="innerContainer">
                <div className="addTaskContainer">
                    <form>
                        <label htmlFor="name" className="tasklabel">Enter Task title...</label> <br/>
                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter task name.." className="taskNameInput"
                        onBlur={()=>{if(name===""){
                            setNameErr("Name cannot be empty!")
                        }
                        else{
                            setNameErr("")
                        }
                    }}
                        /> <br/>
                        {nameErr && <p className="taskErrMsg">{nameErr}</p>}
                        <label htmlFor="name" className="tasklabel">Enter Task description...</label> <br/>
                        <textarea className="taskDescription" rows="7" cols="63"  onBlur={()=>{if(description===""){
                            setDescriptionErr("Description cannot be empty!")
                        }
                        else{
                            setDescriptionErr("")
                        }
                    }} onChange={(e)=>{setDescription(e.target.value)}} value={description}></textarea> <br/>
                            {descriptionErr && <p className="taskErrMsg">{descriptionErr}</p>}

                        <button type="button" className="homeTaskBtn button" onClick={()=>{addTaskRequest()}}>Add Task</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddTask