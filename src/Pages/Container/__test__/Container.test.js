import {render, screen, fireEvent, within} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Container from '../Container'
import {singlePayload, testPayload} from "../../../Components/Columns/__mock__/data";
import {MemoryRouter} from "react-router-dom";

describe("Check if page is loaded correctly on initial load", () => {

    it("check logo is rendered", () => {
        render(<Container/>)
        const logoElement = screen.getByAltText(/trello/i)
        expect(logoElement).toBeInTheDocument()
    })
    it("check add new column button is rendered", () => {
        render(<Container/>)
        const addNewColumnButton = screen.getByRole("button", {name: /add new column/i})
        expect(addNewColumnButton).toBeInTheDocument()
    })


})

describe("check functionalities of add new column button and modal", () => {

    it("check add new column modal is rendered on clicking add new button", () => {
        render(<Container/>)
        const addNewColumnButton = screen.getByRole("button", {name: /add new column/i})
        userEvent.click(addNewColumnButton)
        const addNewColumnModal = screen.getByTestId(/add-column/i)
        expect(addNewColumnModal).toBeInTheDocument()
    })
    it("check input is working for new column modal", () => {
        render(<Container/>)
        const addNewColumnButton = screen.getByRole("button", {name: /add new column/i})
        userEvent.click(addNewColumnButton)
        const addNewColumnModal = screen.getByTestId(/add-column/i)
        const inputElement = within(addNewColumnModal).getByRole("textbox")
        userEvent.type(inputElement, "new column")
        expect(inputElement).toHaveValue("new column")
    })
    it("check create button is working for new column modal", () => {
        render(<Container/>)
        const addNewColumnButton = screen.getByRole("button", {name: /add new column/i})
        userEvent.click(addNewColumnButton)
        const addNewColumnModal = screen.getByTestId(/add-column/i)
        const createButton = within(addNewColumnModal).getByRole("button", {name: /create/i})
        expect(createButton).toBeInTheDocument()
        expect(createButton).not.toBeDisabled()
    })

    it("check create button is working for new column modal", () => {
        render(<Container/>)
        const addNewColumnButton = screen.getByRole("button", {name: /add new column/i})
        userEvent.click(addNewColumnButton)
        const addNewColumnModal = screen.getByTestId(/add-column/i)
        const createButton = within(addNewColumnModal).getByRole("button", {name: /create/i})
        expect(createButton).toBeInTheDocument()
        expect(createButton).not.toBeDisabled()
    })
    it("check create button closes modal", () => {
        render(<Container/>)
        const addNewColumnButton = screen.getByRole("button", {name: /add new column/i})
        userEvent.click(addNewColumnButton)
        const addNewColumnModal = screen.getByTestId(/add-column/i)
        const createButton = within(addNewColumnModal).getByRole("button", {name: /create/i})
        userEvent.click(createButton)
        expect(addNewColumnModal).not.toBeInTheDocument()
    })
})


describe("check adding column functionality works", () => {
    it("check created column has same column name typed on modal", () => {
        render(<Container/>)
        const addNewColumnButton = screen.getByRole("button", {name: /add new column/i})
        userEvent.click(addNewColumnButton)
        const addNewColumnModal = screen.getByTestId(/add-column/i)
        const inputElement = within(addNewColumnModal).getByRole("textbox")
        userEvent.type(inputElement, "new column")
        const createButton = within(addNewColumnModal).getByRole("button", {name: /create/i})
        userEvent.click(createButton)
        const columnComponent = screen.getByTestId(/new column/i)

        expect(columnComponent).toBeInTheDocument()

    })


})

const MockContainer = () => {
    return (<MemoryRouter>
        <Container/>

    </MemoryRouter>)
}

describe('test ', () => {

    beforeEach(() => {
        localStorage.setItem("trello-clone", JSON.stringify(singlePayload))
    })

    afterEach(() => {
        localStorage.removeItem("trello-clone")
    })

    it("delete ticket", () => {
        render(<MockContainer/>)

        const ticketElement = screen.getByTestId(/cards-1-1/i)
        const deleteIcon = within(ticketElement).getByTestId(/DeleteIcon/i)
        userEvent.click(deleteIcon)

        const final = JSON.stringify([{
            "id": 1,
            "name": "Todo",
            "tickets": [{
                "id": 2,
                "name": "Name2",
                "description": "Lorem ipsum dolar simit duo",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }]
        }])

        expect(localStorage.getItem("trello-clone")).toEqual(final)


    })
    it("fav ticket", () => {
        render(<MockContainer/>)

        const ticketElement = screen.getByTestId(/cards-1-1/i)
        const favoriteIcon = within(ticketElement).getByTestId(/FavoriteIcon/i)
        userEvent.click(favoriteIcon)

        const final = JSON.stringify([{
            "id": 1,
            "name": "Todo",
            "tickets": [{
                "id": 1,
                "name": "Name1",
                "description": "Lorem ipsum dolar simit",
                "deadline": "time",
                "image": "",
                "isFavorite": true
            }, {
                "id": 2,
                "name": "Name2",
                "description": "Lorem ipsum dolar simit duo",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }]
        }])

        expect(localStorage.getItem("trello-clone")).toEqual(final)


    })
    it("delete columns", () => {
        render(<MockContainer/>)

        const deleteColumnIcon = screen.getByTestId(/ColumnDeleteIcon/i)
        userEvent.click(deleteColumnIcon)

        const final = JSON.stringify([])
        expect(localStorage.getItem("trello-clone")).toBe(final)

    })

    it("sort tickets", () => {
        render(<MockContainer/>)

        const sortIcons = screen.getByTestId(/ColumnSortByAlphaIcon/i)
        userEvent.click(sortIcons)

        const final = JSON.stringify([{
            "id": 1,
            "name": "Todo",
            "tickets": [{
                "id": 1,
                "name": "Name1",
                "description": "Lorem ipsum dolar simit",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }, {
                "id": 2,
                "name": "Name2",
                "description": "Lorem ipsum dolar simit duo",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }]
        }])

        expect(localStorage.getItem("trello-clone")).toBe(final)


    })
    it("drag tickets", () => {
        render(<MockContainer/>)

        const sortIcons = screen.getByTestId(/ColumnSortByAlphaIcon/i)
        userEvent.click(sortIcons)

        const final = JSON.stringify([{
            "id": 1,
            "name": "Todo",
            "tickets": [{
                "id": 1,
                "name": "Name1",
                "description": "Lorem ipsum dolar simit",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }, {
                "id": 2,
                "name": "Name2",
                "description": "Lorem ipsum dolar simit duo",
                "deadline": "time",
                "image": "",
                "isFavorite": false
            }]
        }])

        expect(localStorage.getItem("trello-clone")).toBe(final)


    })
});

describe("move tickets", () => {
    beforeEach(() => {
        localStorage.setItem("trello-clone", JSON.stringify(testPayload))
    })

    afterEach(() => {
        localStorage.removeItem("trello-clone")
    })
    test("move tickets from first column to second column", () => {
        render(<MockContainer/>)

        fireEvent.mouseDown(screen.getByTestId(/cards-1-1/i), {clientX: 350, clientY: 370})

        fireEvent.mouseMove(screen.getByTestId(/cards-1-1/i), {clientX: 100})

        fireEvent.mouseUp(screen.getByTestId(/cards-1-1/i))


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

        expect(localStorage.getItem("trello-clone")).not.toBe(final)

    })
})

describe("test create button trigger addNewTicket on create ", () => {

    beforeEach(() => {
        localStorage.setItem("trello-clone", JSON.stringify([{"id": 1, "name": "first", "tickets": []}]))
    })

    afterEach(() => {
        localStorage.removeItem("trello-clone")
    })
    it("test", () => {
        render(<MockContainer/>)
        const addNewTicketButton = screen.getByText(/Add new ticket/i)
        userEvent.click(addNewTicketButton)

        const addTicketModal = screen.getByTestId("add-ticket")
        expect(addTicketModal).toBeInTheDocument()


        const nameInput = within(addTicketModal).getByLabelText(/name/i)
        const descriptionInput = within(addTicketModal).getByLabelText(/description/i)
        const deadlineInput = within(addTicketModal).getByLabelText(/deadline/i)

        userEvent.type(nameInput, "abc")
        userEvent.type(descriptionInput, "abc")
        userEvent.type(deadlineInput, "abc")
        const createButton = within(addTicketModal).getByRole("button", {name: /create/i})

        userEvent.click(createButton)

        const final = JSON.stringify([{
            "id": 1,
            "name": "ad",
            "tickets": [{
                "id": 1,
                "name": "abc",
                "description": "abc",
                "deadline": "abc",
                "isFavorite": false,
                "image": ""
            }]
        }])
        expect(localStorage.getItem("trello-clone")).not.toEqual(final)
    })

})
