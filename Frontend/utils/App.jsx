import React from "react";
import ReactDOM from "react-dom/client"
import "./app.css"
import Header from "../components/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "../components/About"
import Contact from "../components/Contact"
import Body from "../components/Body"
import Footer from "../components/Footer"
import RestaurantMenu from "../components/RestaurantMenu";
import { Provider } from "react-redux";
import store from "../utils/store";
import Login from "../components/Login"
import Signup from "../components/Signup";


const App = () => {
    return (
        <div>
            {/* <App/> */}
            {/* <Header /> */}
          
            <Outlet />
            {/* <Footer /> */}
        </div>


    )
    
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <Provider store={store}>
                <App />
            </Provider>
        ),
        children: [
            {
                path: "/",
                element: <Signup />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/body",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
            },
           
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={appRouter}/>)