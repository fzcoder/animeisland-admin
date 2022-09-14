import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import App from '../App';
import VideoServiceRoutes from "./video";
import ErrorRoutes from "./error";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<App />}>
          <Route index element={<Navigate to="/video" />} />
          {VideoServiceRoutes}
          {ErrorRoutes}
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default Router;