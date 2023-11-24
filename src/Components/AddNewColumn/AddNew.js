import {useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {TextField} from "@mui/material";
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./AddNew.scss";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default function AddNew({
                                   type,
                                   addNewColumn,
                                   addNewTicket,
                                   columnId,

                               }) {
    const [open, setOpen] = useState(false);
    const [columnName, setColumnName] = useState("");

    const [ticketName, setTicketName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [image, setImage] = useState("")

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleNewTicket = () => {

        const ticketPayload = {
            columnId,
            name: ticketName,
            description,
            deadline,
            image
        };
        setTicketName("")
        setDescription("")
        setDeadline("")
        setImage("")
        addNewTicket(ticketPayload);

        handleClose();
    };

    const handleNewColumn = () => {
        addNewColumn(columnName);
        setColumnName("")
        handleClose();
    };
    const uploadFileHandler = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onloadend = (e) => {
            const img = reader.result.toString()
            setImage(img)
        };
    }

    return (
        <div >
            <Button onClick={handleOpen}>
                {type === "column" ? "Add new column" : "Add new ticket"}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {type === "column" ? (
                    <Box sx={style} data-testid={"add-column"}>
                        <Box className={"column-create-modal-content"}>
                            <Typography sx={{fontSize: 22}} color="text.secondary">
                                Add new column
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Column name"
                                variant="outlined"
                                value={columnName}
                                onChange={(e) => setColumnName(e.target.value)}
                            />
                            <Button name={"create"} variant="contained" onClick={handleNewColumn}>

                                Create
                            </Button>
                        </Box>
                    </Box>
                ) : (

                    <Box sx={style} data-testid={"add-ticket"}>
                        <Typography sx={{fontSize: 22}} color="text.secondary">
                            Add new ticket
                        </Typography>
                        <Box className={"column-create-modal-content"}>

                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                value={ticketName}
                                required={true}
                                onChange={(e) => setTicketName(e.target.value)}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Description"
                                variant="outlined"
                                value={description}
                                required={true}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Deadline"
                                variant="outlined"
                                value={deadline}
                                required={true}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                            <Button
                                component="label"

                                startIcon={<CloudUploadIcon/>}

                            >
                                Upload file
                                <VisuallyHiddenInput type="file" onChange={(e) => uploadFileHandler(e)}/>
                            </Button>
                            <Button style={{pointerEvents: "auto"}} onClick={handleNewTicket}
                                    name={"create"} variant="contained">
                                {" "}
                                Create
                            </Button>
                        </Box>


                    </Box>

                )}
            </Modal>
        </div>
    );
}
