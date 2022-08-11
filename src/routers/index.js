import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from '../App';
import VideoServiceRoutes from "./video";
import ErrorRoutes from "./error";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />}>
          <Route index element={<Navigate to="/video" />} />
          {VideoServiceRoutes}
          {ErrorRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;