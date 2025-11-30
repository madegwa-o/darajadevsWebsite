import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import AuthenticationProvider, {type User} from "./hooks/authhook.tsx";
import HomePage from "./pages/homePage/HomePage.tsx";
import ThemeProvider from "./hooks/themehook.tsx";
import NotificationProvider from "./hooks/notificationhook.tsx";
import DevelopersPage from "./pages/developersPage/DevelopersPage.tsx";
import ProjectsPage from "./pages/projectsPage/ProjectsPage.tsx";
import TeamsPage from "./pages/teams/TeamsPage.tsx";


const routes = createBrowserRouter([
    {
        element: <App />,
        path: '/',
        children: [
            {
                element: <HomePage />,
                path: '/'
            },
            {
                element: <DevelopersPage />,
                path: '/devs'

            },
            {
                element: <ProjectsPage />,
                path: '/projects'

            },
            {
                element: <TeamsPage />,
                path: '/teams'

            }
        ]
    }

])

const user: User = {
    id: 1234,
    name: "User",
    email: "User@gmail.com"
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <NotificationProvider >
              <AuthenticationProvider initialUser={user} >
                  <RouterProvider router={routes} />
              </AuthenticationProvider>
          </NotificationProvider>
      </ThemeProvider>
  </StrictMode>,
)

