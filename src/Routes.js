import Home from "./Pages/Home";
import JitsiAPI from "./Pages/JitsiAPI";
import Login from "./Pages/Login";
import Meeting from "./Pages/Meeting";
import Room from "./Pages/Room";
import SignIn from "./Pages/SignIn";

export const Routes = [
  { path: "/", element: <SignIn />},
  { path: "login", element: <Login />},
  { path: "signIn", element: <SignIn/> },
  { path: 'home', element: <Home/> },
  // using ZEGOCLOUD api
  { path: 'room/:id', element: <Room/> },
  // using zoom api
  { path:'meeting', element: <Meeting/>},
  // Jitsi api
  // Id will genrate in Home page from now
  { path:'jitsi/:id',element:<JitsiAPI/> }
]