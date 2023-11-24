import Columns from "../../Components/Columns/Columns";
import { useState} from "react";
import "./Container.scss"
import trelloLogo from '../../Assets/trello.svg'
import AddNew from "../../Components/AddNewColumn/AddNew";


const getLocalStorage = () => {
    const localData = JSON.parse(localStorage.getItem("trello-clone"))

    if (localData !== null) {
        return localData
    }
    return []
}
const Container = () => {

    const [columns, setColumn] = useState(getLocalStorage)

    const setLocalStorage = (updatedColumns) => {
        localStorage.setItem("trello-clone", JSON.stringify(updatedColumns))
    }


    const addNewColumn = (columnName) => {
        const newColumnPayload = {id: columns.length + 1, name: columnName, tickets: []}
        setColumn([...columns, newColumnPayload])
        setLocalStorage([...columns, newColumnPayload])
    }
    const addNewTicket = (ticketData) => {

        const updatedColumns = columns.map(column => {
            if (column.id === ticketData.columnId) {
                column.tickets.push({
                    id: column.tickets.length + 1,
                    name: ticketData.name,
                    description: ticketData.description,
                    deadline: ticketData.deadline,
                    isFavorite: false,
                    image: ticketData.image
                })
                return column
            } else {
                return column
            }
        })
        setColumn(updatedColumns)
        setLocalStorage(updatedColumns)
    }

    function sortFavHelper(col) {
        return col.map(column => {
            const sorted = column.tickets.reduce((acc, task) => {
                if (task.isFavorite) {
                    return [task, ...acc]
                } else {
                    return [...acc, task]
                }
            }, [])
            return {...column, tickets: sorted}
        })
    }

    const handleFavoriteTask = (ticketDetails) => {

        const updatedColumns = columns.map(column => {
            if (column.id === ticketDetails.columnId) {
                const markTicketsAsFav = column.tickets.map(ticket => {
                    if (ticket.id === ticketDetails.ticketId) {
                        ticket.isFavorite = !ticket.isFavorite
                        return ticket
                    }
                    return ticket
                })

                const sortFavTickets = markTicketsAsFav.reduce((acc, task) => {
                    if (task.isFavorite) {
                        return [task, ...acc]
                    } else {
                        return [...acc, task]
                    }
                }, [])


                return {...column, tickets: sortFavTickets}
            } else {
                return column
            }
        })
        setColumn(updatedColumns)
        setLocalStorage(updatedColumns)
    }

    const handleDeleteTicket = (ticketDetails) => {

        const updatedColumns = columns.map(column => {
            if (column.id === ticketDetails.columnId) {
                const tickets = column.tickets.filter(ticket => ticket.id !== ticketDetails.ticketId)
                return {...column, tickets}

            } else {
                return column
            }
        })
        setColumn(updatedColumns)
        setLocalStorage(updatedColumns)
    }

    const handleDeleteColumn = (columnId) => {
        const columnsAfterDeletingColumn = columns.filter(column => column.id !== columnId)

        setColumn(columnsAfterDeletingColumn)
        setLocalStorage(columnsAfterDeletingColumn)
    }

    const handleSort = (columnId) => {


        const sortedColumns = columns.map(column => {
            if (column.id === columnId) {
                const tickets = column.tickets.sort((a, b) => {

                    return a.name.localeCompare(b.name)
                })
                return {...column, tickets}
            } else {
                return column
            }
        })

        setColumn(sortedColumns)
        setLocalStorage(sortedColumns)
    }

    const handleDrag = (fromCol, toCol, ticketID) => {
        let ticketToBeAdded = columns.filter(column => column.id === parseInt(fromCol))[0].tickets.filter(ticket => ticket.id === parseInt(ticketID))[0]
        const modifiedColumns = columns.map(column => {
            if (column.id === parseInt(fromCol)) {
                column.tickets = column.tickets.filter((ticket) => ticket.id !== parseInt(ticketID))
                return column
            }
            return column
        })

        const modifiedTickets = modifiedColumns.map(column => {
            if (column.id === parseInt(toCol)) {
                const lastItem = column.tickets?.sort((a, b) => b.id - a.id)[0] || {id: 1}
                ticketToBeAdded.id = lastItem.id + 1
                column.tickets.push(ticketToBeAdded)
                return column
            } else {
                return column
            }
        })

        setColumn(sortFavHelper(modifiedTickets))
        setLocalStorage(sortFavHelper(modifiedTickets))
    }


    return (
        <main>
            <header className={"header"}>
                <img src={trelloLogo} alt="trello logo"/>
                <AddNew  type={"column"} addNewColumn={addNewColumn}/>
            </header>

            <div className={"content-section"}>
                {columns.map((column) => <Columns key={column.id} name={column.name} data={column}
                                                  addNewTicket={addNewTicket}
                                                  handleFavoriteTask={handleFavoriteTask}
                                                  handleDeleteTicket={handleDeleteTicket}
                                                  handleSort={handleSort}
                                                  handleDeleteColumn={handleDeleteColumn}
                                                  handleDrag={handleDrag}
                />)}

            </div>


        </main>
    )
}

export default Container
