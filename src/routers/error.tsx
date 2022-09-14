import { Route } from "react-router-dom";
import NotFound from "../pages/error/NotFound";

const ErrorRoutes = (
  <Route path='*' element={<NotFound />} />  
)

export default ErrorRoutes;
