import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Task from "./page/task/Task";
import {APP_ROUTES} from "./config/routes.ts";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path={APP_ROUTES.TASK} element={<Task />} />
                <Route path={APP_ROUTES.BUS_CRUD} element={<div style={{color: 'white'}}>Bus CRUD oldal</div>} />
            </Routes>
        </BrowserRouter>
    );
}
