import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import  './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom';

import Course from "./pages/Course/Course.jsx";
import Editor from "./pages/Editor/Editor.jsx";
import Lab from "./Environments/Lab/Lab.jsx";
import School from "./Environments/School/School.jsx";
import Test from "./Test.jsx";

const user = {
  id: 10253,
  firstname: "youssef",
  lastname: "moustaiid",
  email: "testingemail@gmail.com",
  password: "aaaaaaaaaa",
  gender: "m",
  birthdate: "22/01/2004",
  profile: "" ,
};
const assets = [{
  id : 114 ,
  uploaderID : 16 ,
  name : "",
  description : "",
  url : 'C:/Users/moustaid/Desktop/Immerse/Plateforme/src/assets/3D_Components/imac.glb',
  environment : "", // lab or school 
  scale : "1 1 1" ,
  position : "0 0 0" ,
  rotation :"0 0 0" ,
}];
const video = {
  id : 45 ,
  uploaderID : 16 ,
  embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/1L6hinhDXQE?si=BTRbObHgVz8IUuUE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' ,
  scale : "1 1 1" ,
  position : "0 10 0" ,
  rotation :"0 0 0" ,
} ;
const pdf = {
  id : 45 ,
  uploaderID : 16 ,
  url: '../../assets/PDFs/rapport.pdf' ,
  scale : "1 1 1" ,
  position : "0 0 0" ,
  rotation :"0 0 0" ,
} ;

const AppWrapper = (props) => {
  const location = useLocation();
  return <App user = {user} />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWrapper />,
    children: [
      {
        path: 'course',
        element: <Course />,
      },
      {
        path: 'test',
        element: <Test />,
      },
      {
        path: 'editor',
        element: <Editor />,
      },
      {
        path: 'Lab',
        element: <Lab user={user} pdf={pdf} video={video} assets={assets} />,
      },
      {
        path: 'School',
        element: <School user={user} pdf={pdf} video={video} assets={assets} />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
