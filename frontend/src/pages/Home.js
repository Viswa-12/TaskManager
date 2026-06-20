import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Spinner from "../components/LoadingSpinner";
import FetchTasksApi from "../apis/FetchTasksApi";
import Task from "../components/Task";
import "../styling/Home.css"

const Home=()=>{
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const [tasksData,setData]=useState([])
    const [fetchErr,setFetchErr]=useState(false)

    useEffect(()=>{
        fetchTasks()
    },[])

    const fetchTasks = async () => {

    try {

        setLoading(true)

        const data = await FetchTasksApi()

        if (data.status) {

            setData(data.tasks)
        }

    } catch (err) {

        setFetchErr(true)

    } finally {

        setLoading(false)
    }
}

    const addTask=()=>{
        navigate("/addtask")
    }


    return (
        <>
        <div className="container">
                    <Header/>
            <div className="innerContainer">
                <div className="homeBtnContainer"><button className="homeTaskBtn" onClick={()=>{
                    addTask()
                }}>+ Add Task</button></div> 
                <div className="tasksInfo">
                     {loading && <Spinner/>}
                     {!loading && tasksData.length === 0 && (
        <h1 className="noTasks">
            No Tasks Available
        </h1>
    )}
                     {!loading && tasksData.map((ele)=>{
                      return <Task key={ele._id} {...ele}/>
                     })}
                </div>
            </div>
        </div>
        </>
    )
}

export default Home