//index.js => put the components from App.js to index.html

import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

//not importing the app.js because eevrything is done here in index.js itself
//creating routes with path and the element to be rendered when  that path is accessed
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Join/>
    ),
  },
  {
    path: "/chat",
    element: <Chat/>,
  },
]);

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
//means create the root by ID and render the router elements in the root

