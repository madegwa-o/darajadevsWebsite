import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import AuthenticationProvider from "./hooks/authhook.tsx";
import HomePage from "./pages/homePage/HomePage.tsx";
import ThemeProvider from "./hooks/themehook.tsx";
import NotificationProvider from "./hooks/notificationhook.tsx";
import DevelopersPage from "./pages/developersPage/DevelopersPage.tsx";
import ProjectsPage from "./pages/projectsPage/ProjectsPage.tsx";
import TeamsPage from "./pages/teams/TeamsPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LoginPage from "./pages/loginPage/LoginPage.tsx";


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
                element: (
                    <ProtectedRoute>
                        <DevelopersPage />
                    </ProtectedRoute>
                ),
                path: '/devs'
            },
            {
                element: (
                    <ProtectedRoute>
                        <ProjectsPage />
                    </ProtectedRoute>
                ),
                path: '/projects'

            },
            {
                element: (
                    <ProtectedRoute>
                        <TeamsPage />
                    </ProtectedRoute>
                ),
                path: '/teams'

            }
        ]
    },
    {
        element: <LoginPage />,
        path: '/login'
    }

])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <NotificationProvider >
              <AuthenticationProvider >
                  <RouterProvider router={routes} />
              </AuthenticationProvider>
          </NotificationProvider>
      </ThemeProvider>
  </StrictMode>,
)

