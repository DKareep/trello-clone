import {useState} from "react";
import "./Columns.scss";
import Ticket from "../Ticket/Ticket";
import * as React from "react";
import AddNewTicket from "../AddNewColumn/AddNew";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import DeleteIcon from '@mui/icons-material/Delete';

const Columns = ({
                     name,
                     data,
                     addNewTicket,
                     handleFavoriteTask,
                     handleDeleteTicket,
                     handleSetTaskForEditing,
                     ticketBeingEdited,
                     handleSort,
                     handleDrag,
                     handleDeleteColumn
                 }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const handleEditMode = (ticketDetails) => {

        setIsEditMode(true);
        handleSetTaskForEditing(ticketDetails);
    };

    function allowDrop(ev) {
        ev.preventDefault();

    }

    function drop(ev) {
        ev.preventDefault();
        const toCol = data.id
        const fromCol = ev.dataTransfer.getData("col")
        const ticketId = ev.dataTransfer.getData("ticket")
        handleDrag(fromCol, toCol, ticketId)
    }

    return (
        <div className={"column-container"} data-testid={`col-${data.id}`}>
            <section className={"column-header"} data-testid={name}>
                {name}{" "}
                <span data-testid="icons" className={"more-icon"}>
                   <span data-testid={"ColumnSortByAlphaIcon"} onClick={() => handleSort(data.id)}><SortByAlphaIcon   sx={{cursor: "pointer"}} /></span>
                   <span data-testid={"ColumnDeleteIcon"}  onClick={() => handleDeleteColumn(data.id)} ><DeleteIcon  sx={{cursor: "pointer"}} /></span>

                </span>
            </section>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 300,
                    height: 40
                }}


            >
                <AddNewTicket
                    type={"card"}
                    columnId={data.id}
                    addNewTicket={addNewTicket}
                    handleEditMode={handleEditMode}
                    isEditMode={isEditMode}
                    ticketBeingEdited={ticketBeingEdited}
                />
            </div>
            <section onDrop={drop} onDragOver={allowDrop} className="column-content">

                {data?.tickets?.map((ticketDetails) => (
                    <Ticket
                        key={ticketDetails.id}
                        columnId={data.id}
                        data={ticketDetails}
                        handleFavoriteTask={handleFavoriteTask}
                        handleDeleteTicket={handleDeleteTicket}
                        handleEditMode={handleEditMode}
                    />
                ))}

            </section>
        </div>
    );
};

export default Columns;
