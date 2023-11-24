
import './App.css';
import DropContainer from "./Pages/Container/Container";
import TaskDetails from "./Pages/TaskDetails/TaskDetails";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {


  return (
    <BrowserRouter >
        <Routes>
            <Route path="/:colId/:ticketId" element={<TaskDetails />} />
            <Route path="/" element={<DropContainer />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
