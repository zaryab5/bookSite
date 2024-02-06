import App from "../App";
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import Blog from "../components/Blog";
import Home from "../components/Home";
import Shop from "../components/Shop";
import About from "../components/About";
import FilterSideBar from "../components/FilterSideBar";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import SingleBook from "../components/SingleBook";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UploadBook from "../components/Dashboard/UploadBook";
import ManageBooks from "../components/ManageBooks";
import EditBooks from "../components/Dashboard/EditBooks";
import Login from "../components/Login";
import Table from "../components/Dashboard/Table";
import Contact from "../components/Contact";
import LibraryLayout from "../components/LibraryLayout";
import Register from "../components/Register";
import Main from "../components/Dashboard/Main";
import NotFound from "../components/NotFound";
import Comming from "../components/Dashboard/Comming";
import Users from "../components/Dashboard/Users";
import UploadMany from "../components/Dashboard/UploadMany";

 
const api=import.meta.env.VITE_BASE_URL;
  const router = createBrowserRouter([
    {
      path: "/",
      element:<App/>,
      children: [
        {
          path: "/",
      element:<Home/>,
        },
    {
      path: "/blog",
      element:<Blog/>,
    },
    {
      path: "/shop/:query",
      element:<Shop/>,
    },
    {
      path: "/shop/",
      element:<Shop/>,
    },
    {
      path:"/side",
      element:<FilterSideBar/>
    },
    {
      path:"/contact",
      element:<Contact/>
    },
    {
     path:"/about",
     element:<About/>
    },
    {
      path:"/books/:id",
      element:<SingleBook/>,
      loader:({params})=>fetch(`${api}/books/${params.id}`)
    }
  ]
    },
    {
        path:"/admin/dashboard",
        element:(<RequireAuth fallbackPath="/login"><Dashboard></Dashboard></RequireAuth>),
        children:[
          {
                  path:"/admin/dashboard",
                  element:(<RequireAuth fallbackPath="/login"><Main/></RequireAuth>),
                },
          {
            path:"/admin/dashboard/upload",
            element:(<RequireAuth fallbackPath="/login"><UploadBook/></RequireAuth>),
          },
          {
            path:"/admin/dashboard/manage",
            element:(<RequireAuth fallbackPath="/login"><Table/></RequireAuth>),
          },
          {
            path:"/admin/dashboard/edit-books/:id",
            element:(<RequireAuth fallbackPath="/login"><EditBooks/></RequireAuth>),
            loader:({params})=>fetch(`${api}/books/${params.id}`)
          },
          {
            path:"/admin/dashboard/user",
            element:(<RequireAuth fallbackPath="/login"><Users/></RequireAuth>),
          },
          {
            path:"/admin/dashboard/bulk-upload",
            element:(<RequireAuth fallbackPath="/login"><UploadMany/></RequireAuth>),
          },
          {
            path:"/admin/dashboard/comming-soon",
            element:(<RequireAuth fallbackPath="/login"><Comming/></RequireAuth>),
            
          }
        ]
      },
    {
      path:"/login",
      element:<Login/>
    },{
      path:"/register",
      // element:(<RequireAuth fallbackPath="/login"><Register/></RequireAuth>)
      element:<Register/>
    
    },{
      path:"/table",
      element:<ManageBooks/>
    },
    {
      path:"/notFound",
      element:<NotFound/>
    }
 
  ]);

  export default router


