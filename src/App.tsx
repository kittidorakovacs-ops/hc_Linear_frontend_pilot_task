/* import { BrowserRouter, Routes, Route } from "react-router-dom";
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
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Task from "./page/task/Task";
import { APP_ROUTES } from "./config/routes";
import { BusList } from "./page/bus/BusList";
import { BusDetail } from "./page/bus/BusDetail";
import { BusEdit } from "./page/bus/BusEdit";
import BoardPage from "./page/board/BoardPage"; 

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main style={{ padding: "16px" }}>
        <Routes>
          {/* Főoldal → Feladatboard */}
          <Route path={APP_ROUTES.TASK} element={<Task />} />

          {/* Buszlista */}
          <Route path={APP_ROUTES.BUS_CRUD} element={<BusList />} />

          {/* Busz részletező*/}
          <Route path={APP_ROUTES.BUS_DETAIL} element={<BusDetail />} />

            {/* Busz szerkesztő*/}
          <Route path={APP_ROUTES.BUS_EDIT} element={<BusEdit />} />

           <Route path={APP_ROUTES.BOARD} element={<BoardPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
