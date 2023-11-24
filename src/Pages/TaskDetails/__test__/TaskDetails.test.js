import {render, screen, fireEvent, within} from "@testing-library/react";
import {singlePayload} from '../__mock__/data'
import TaskDetails from "./../TaskDetails";
import {MemoryRouter, Routes, Route} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import * as router from 'react-router'

const handleBackButton = jest.fn()
const MockTaskDetails = () => {
    return(<MemoryRouter initialEntries={['/1/1']}>
        <Routes>
            <Route path={"/:colId/:ticketId"} element={<TaskDetails />}/>
        </Routes>

    </MemoryRouter>)
}



describe("check task details renders properly", () => {

    beforeAll(() => {
        localStorage.setItem("trello-clone", JSON.stringify(singlePayload))
    })

    afterAll(()=> {
        localStorage.removeItem("trello-clone")
    })
    it("Task details page name and details loaded correctly and back button click fires useNavigate with / as param", async  () => {
        const navigateSpy = jest.spyOn(router,'useNavigate').mockImplementation(() => handleBackButton);
        render(<MockTaskDetails />)

        const taskNameEl = await screen.findByTestId(/task-name/i)
        const taskDescriptionEl = await screen.getByTestId(/task-description/i)

        expect(taskNameEl).toHaveTextContent(singlePayload[0].tickets[0].name)
        expect(taskDescriptionEl).toHaveTextContent(singlePayload[0].tickets[0].description)

        const goBackButtonEl =   screen.getByTestId(/back-button/i)
        userEvent.click(goBackButtonEl)
        expect(handleBackButton).toHaveBeenCalledWith('/')
    })


})

