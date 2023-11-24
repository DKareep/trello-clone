import "./Ticket.scss"
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {IconButton, Typography} from "@mui/material";
import {red, grey} from '@mui/material/colors';

const isFavorite = red[700]
const isNotFavorite = grey[700]
const cardColor = grey[200]


const Ticket = ({data, columnId, handleFavoriteTask, handleDeleteTicket, handleEditTicket, handleEditMode}) => {

    const navigate = useNavigate();
    const showDetails = () => {
        navigate(`/${columnId}/${data.id}`)

    }
    const drag = (ev,columnId, ticket) => {
        ev.dataTransfer.setData("col", columnId);
        ev.dataTransfer.setData("ticket", ticket);
    }
    return (
        <>
            <Card
                data-testid={`cards-${columnId}-${data.id}`}
                draggable={true}
                    onDragStart={(e) => drag(e, columnId, data.id)}
                    style={{backgroundColor: cardColor}} variant="outlined" sx={{ width: 300, minHeight: data.image ? 330 : 250}}>
                <CardContent
                    sx={{padding: 0}}
                >

                    <Card sx={{cursor: "pointer"}} data-testid={"title-deadline"} onClick={showDetails} >


                        <Typography  sx={{fontSize: 14, paddingLeft: 2, paddingTop: 2}} variant="body2" color="text.secondary">Name</Typography>
                        <Typography data-testid={"name"} sx={{fontSize: 20,  paddingLeft: 2, paddingBottom: 1}} variant="body2" color="text.primary">
                        { data.name.substring(0,10)}
                    </Typography>

                        <Typography  sx={{fontSize: 14,  paddingLeft: 2}} variant="body2" color="text.secondary">Deadline</Typography>
                        <Typography data-testid={"deadline"} sx={{fontSize: 20, paddingLeft: 2, paddingBottom: 1}} variant="body2" color="text.primary">
                        { data.name.substring(0,10)}
                    </Typography>

                        <Typography sx={{fontSize: 14,  paddingLeft: 2}} variant="body2" color="text.secondary">Description</Typography>
                        <Typography data-testid={"details"} sx={{fontSize: 20, paddingLeft: 2, paddingBottom: 1}} variant="body2" color="text.primary">
                        { data.description.substring(0,10)}
                    </Typography>

                        {data.image &&
                            <CardMedia
                                component="img"
                                height="100%"
                                image={data.image}
                                alt="ticket media"
                            />
                        }
                    </Card>
                </CardContent>
                <CardActions className={"ticket-icon-container"} disableSpacing>
                    <IconButton aria-label="add to favorites"
                                onClick={() => handleFavoriteTask({columnId, ticketId: data.id})}>

                        <FavoriteIcon sx={{color: data.isFavorite ? isFavorite : isNotFavorite}}/>
                    </IconButton>

                    <IconButton aria-label="delete ticket"
                                onClick={() => handleDeleteTicket({columnId, ticketId: data.id})}>
                        <DeleteIcon/>
                    </IconButton>


                </CardActions>

            </Card>
        </>
    )
}

export default Ticket