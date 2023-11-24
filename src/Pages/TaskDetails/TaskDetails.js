import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import trelloLogo from "../../Assets/trello.svg";
import Button from "@mui/material/Button";
import "./TaskDetails.scss"
import CardMedia from "@mui/material/CardMedia";
import {Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {useNavigate} from 'react-router-dom';

const getLocalStorage = () => {
    const localData = JSON.parse(localStorage.getItem("trello-clone"))
    if (localData !== null) {
        return localData
    }
    return []
}
const TaskDetails = () => {

    const {colId, ticketId} = useParams()

    const [columns,] = useState(getLocalStorage)

    const [taskDetails, setTaskDetails] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
        const col = columns.filter(column => column.id = colId)
        console.log(col)
        const filteredTask = col[0].tickets.filter(ticket => {
            return ticket.id === parseInt(ticketId)
        })
        console.log(filteredTask)
        setTaskDetails(filteredTask[0])
    }, [columns, colId, ticketId])

    const handleBackButton = () => {
        navigate(`/`)
    }
    return (

        <>
            <header className={"header"}>
                <img src={trelloLogo} alt="trello on header"/>
            </header>
            <section className={"task-details-container"}>


                <Button data-testid="back-button" onClick={handleBackButton}>Go back</Button>
                <article className={"task-details"}>
                    <Card variant="outlined" sx={{width: "80%"}}>

                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Task name
                            </Typography>
                            <Typography data-testid={"task-name"} variant="h5" color="text.primary" component="div">
                                {taskDetails?.name}
                            </Typography>
                            <br/>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                Description
                            </Typography>
                            <Typography data-testid={"task-description"} variant="h5" color="text.primary">
                                {taskDetails?.description}
                            </Typography>
                            <br/>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                Deadline
                            </Typography>
                            <Typography data-testid={"task-description"} variant="h5" color="text.primary"
                                       >
                                {taskDetails?.deadline}
                            </Typography>
                            <br/>
                            {taskDetails?.image &&
                                <>
                                    <Typography sx={{mb: 1.5}} color="text.secondary">
                                        Media
                                    </Typography>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: 300
                                        }}
                                        image={taskDetails?.image}
                                        alt="media"
                                    /> </>}
                        </CardContent>
                    </Card>
                </article>
            </section>
        </>

    )
}

export default TaskDetails