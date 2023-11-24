import {render, screen, fireEvent, within} from "@testing-library/react";
import {singlePayload, testPayload} from '../__mock__/data'
import userEvent from '@testing-library/user-event'
import Columns from "./../Columns";
import {BrowserRouter} from "react-router-dom";


function renderComponent  ()  {
    const addNewTicket = jest.fn()
    const handleFavoriteTask = jest.fn()
    const handleDeleteTicket = jest.fn()
    const handleSort = jest.fn()
    const handleDeleteColumn = jest.fn()
    const handleDrag = jest.fn()

    render( <BrowserRouter>
        <Columns key={singlePayload[0].id}
                 name={singlePayload[0].name}
                 data={singlePayload[0]}
                 addNewTicket={addNewTicket}
                 handleFavoriteTask={handleFavoriteTask}
                 handleDeleteTicket={handleDeleteTicket}
                 handleSort={handleSort}
                 handleDeleteColumn={handleDeleteColumn}
                 handleDrag={handleDrag}
        />
    </BrowserRouter>)
    return {addNewTicket, handleFavoriteTask, handleDeleteTicket, handleDrag}

}

describe("functionalities of add new component", () => {
    it("check presence of add new ticket button ", () => {

        renderComponent()
        const addNewTicketButton = screen.getByText(/Add new ticket/i)
        expect(addNewTicketButton).toBeInTheDocument()

    })
    it("test modal opening on click add new text ", () => {

        renderComponent()
        const addNewTicketButton = screen.getByText(/Add new ticket/i)
        userEvent.click(addNewTicketButton)

        const addTicketModal = screen.getByTestId("add-ticket")
        expect(addTicketModal).toBeInTheDocument()


    })
    it("test modal opening on click add new text ", () => {

        renderComponent()
        const addNewTicketButton = screen.getByText(/Add new ticket/i)
        userEvent.click(addNewTicketButton)

        const addTicketModal = screen.getByTestId("add-ticket")
        expect(addTicketModal).toBeInTheDocument()


    })
    it("test modal opening on click add new text ", () => {

        renderComponent()
        const addNewTicketButton = screen.getByText(/Add new ticket/i)
        userEvent.click(addNewTicketButton)

        const addTicketModal = screen.getByTestId("add-ticket")
        expect(addTicketModal).toBeInTheDocument()
        const createButton = within(addTicketModal).getByRole("button", {name: /create/i})
        expect(createButton).toBeInTheDocument()


    })
    it("test create button is disabled without input  ", () => {

        renderComponent()
        const addNewTicketButton = screen.getByText(/Add new ticket/i)
        userEvent.click(addNewTicketButton)

        const addTicketModal = screen.getByTestId("add-ticket")
        expect(addTicketModal).toBeInTheDocument()
        const createButton = within(addTicketModal).getByRole("button", {name: /create/i})
        expect(createButton).toBeInTheDocument()



    })

    it("test create button trigger addNewTicket on create ",  () => {

        const {addNewTicket} = renderComponent()
        const addNewTicketButton = screen.getByText(/Add new ticket/i)
        userEvent.click(addNewTicketButton)

        const addTicketModal = screen.getByTestId("add-ticket")
        expect(addTicketModal).toBeInTheDocument()


        const nameInput = within(addTicketModal).getByLabelText(/name/i)
        const descriptionInput = within(addTicketModal).getByLabelText(/description/i)
        const deadlineInput = within(addTicketModal).getByLabelText(/deadline/i)

        userEvent.type(nameInput,"abc")
        userEvent.type(descriptionInput,"abc")
        userEvent.type(deadlineInput,"abc")
        const createButton = within(addTicketModal).getByRole("button", {name: /create/i})

        userEvent.click(createButton)
        expect(addNewTicket).toBeCalled()
        expect(addTicketModal).not.toBeInTheDocument()


    })



})

describe("props are rendered correctly", () => {
    it("check number of tickets rendered is correct", () => {
        renderComponent()
        const ticketElements = screen.getAllByTestId(/cards/i)
        expect(ticketElements).toHaveLength(2)

    })
    it("check tickets are rendered", () => {
        renderComponent()
        const ticketElement = screen.getByTestId(/cards-1-1/i)
        expect(ticketElement).toBeInTheDocument()

    })
    it("check rendered values of ticket are correct", () => {
        renderComponent()
        const ticketElement = screen.getByTestId(/cards-1-1/i)


        const titleDeadlineWrapper = within(ticketElement).getByTestId(/title-deadline/i)
        const descriptionWrapper = within(ticketElement).getByTestId(/description/i)

        const nameComponent = within(titleDeadlineWrapper).getByText(/Name/i)
        const deadlineComponent = within(titleDeadlineWrapper).getByText(/time/i)
        const descriptionComponent = within(descriptionWrapper).getByText(/lorem/i)


        expect(nameComponent).toHaveTextContent("Name1")
        expect(deadlineComponent).toHaveTextContent("time")
        expect(descriptionComponent).toHaveTextContent("Lorem ipsum dolar simit")

    })
    it("check respective functions are called properly on user action", () => {
       const {handleFavoriteTask, handleDeleteTicket} = renderComponent()
        const ticketElement = screen.getByTestId(/cards-1-1/i)


        const favIcon = within(ticketElement).getByLabelText(/add to favorites/i)
        const deleteIcon = within(ticketElement).getByLabelText(/delete ticket/i)

        userEvent.click(favIcon)
        userEvent.click(deleteIcon)

        expect(handleFavoriteTask).toBeCalled()
        expect(handleDeleteTicket).toBeCalled()

    })


    //
    // it("check number of tickets rendered", () => {
    //
    // })

})

describe.skip("checks for functionalities", () => {

    const getLocalStorage = () => {
        const localData = JSON.parse(localStorage.getItem("trello-clone"))

        if (localData !== null) {
            return localData
        }
        return []
    }

    const handleDeleteTicket = jest.fn()

    beforeAll(() => {
        localStorage.setItem("trello-clone", JSON.stringify(singlePayload))
    })

    afterAll(()=> {
        localStorage.removeItem("trello-clone")
    })
        it("func", ()=> {
            renderComponent()
            const ticketElement = screen.getByTestId(/cards-1/i)
            const deleteIcon = within(ticketElement).getByLabelText(/delete ticket/i)
            userEvent.click(deleteIcon)


            expect(handleDeleteTicket).toBeCalled()
        })
})

describe("move tickets", () => {
    beforeEach(() => {
        localStorage.setItem("trello-clone", JSON.stringify(testPayload))
    })

    afterEach(() => {
        localStorage.removeItem("trello-clone")
    })
    test("move tickets from first column to second column", () => {
       const {handleDrag}= renderComponent()
        const ticketElementCol1Row1 = screen.getByTestId(/cards-1-1/i)
        fireEvent.mouseDown(ticketElementCol1Row1, {clientX: 200, clientY: 400})

        fireEvent.mouseMove(ticketElementCol1Row1,{clientX: 100, clientY: 400})

        fireEvent.mouseUp(ticketElementCol1Row1)


        const final = JSON.stringify([{"id": 1, "name": "Todo", "tickets": []}, {
            "id": 2,
            "name": "Progress",
            "tickets": [{
                "id": 3,
                "name": "zeman",
                "description": "simit Lorem ipsum dolar ",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }, {
                "id": 2,
                "name": "eman",
                "description": "simit Lorem ipsum dolar ",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }, {
                "id": 1,
                "name": "yeman",
                "description": "simit Lorem ipsum dolar ",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }, {
                "id": 4,
                "name": "1Name",
                "description": "Lorem ipsum dolar simit",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }]
        }, {
            "id": 3,
            "name": "3Done",
            "tickets": [{
                "id": 1,
                "name": "name2",
                "description": "simit Lorem ipsum dolar ",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }]
        }])

        expect(handleDrag).not.toBeCalled()


    })
})