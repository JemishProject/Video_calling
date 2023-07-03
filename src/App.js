import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import { Routes } from './Routes';

// react toastify css
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(Routes);
function App() {
  return <RouterProvider router={router} />
}

export default App;
