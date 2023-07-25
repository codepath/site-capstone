import { AppShell, Box, Header, MantineProvider, Space, Text } from '@mantine/core';
import Landing from './pages/Landing/Landing';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import { useAuthentication } from './services/hooks/useAuthentication';
import MyProjects from './pages/Volunteer/MyProjects';
import CreateProject from './pages/Org/CreateProject';
import VolunteerHome from './pages/Volunteer/Home/VolunteerHome';
import OrgHome from './pages/Org/Home/OrgHome';
import { fetchCorrectUserOption } from './utility/utility';
import VolunteerProjectDetails from './pages/Volunteer/VolunteerProjectDetails';


function App() {
  /**
   * @todo: 
   * implement loader states as well
   * test login 
   * start building first all functional pages for the volunteer 
   * then styling each one by one. 
   * then switch to organization
   * then look into stretch features:
   * start web scraping data from democracy lab
   * email validation, password security, photo image hosting
   */
  // Appshell is used to navbar overlay across all pages 
  const [{ isAuth, user }, setToken, removeToken] = useAuthentication();

  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ primaryColor: "violet" }}>
        <BrowserRouter>
          <AppShell pl={0} pr={0}
            styles={(theme) => ({
              main: { padding: "initial 0" },
              root: {
                height: "100%",
                backgroundImage: !isAuth ? theme.fn.linearGradient(180, theme.colors.violet[5],theme.colors.violet[0], theme.white, theme.colors.violet[2])
                : theme.fn.linearGradient(180, theme.colors.violet[0],theme.colors.violet[0])
              }
            })}
            header={<Navbar removeToken={removeToken} isAuth={isAuth} user={user} />}>
            <Routes>
              <Route path="/" element={
                fetchCorrectUserOption((<Landing />),
                  (<VolunteerHome user={user} />),
                  <OrgHome user={user} />,
                  { isAuth: isAuth, user: user })} />

              {/* POST AUTHENTICATION */}
              {/* Displays project by details page for each user role */}
              <Route path="/projects" element={<MyProjects isAuth={isAuth} user={user} />} />
              {/* projects is  specific to the volunteers */}
              <Route path="/projects/:projectId" element={<VolunteerProjectDetails isAuth={isAuth} user={user} />} />
              {/* projects/projectId is used for both volunteers and organizations */}
              <Route path="/projects/create" element={<CreateProject isAuth={isAuth} user={user} />} />
              {/* projects/create is specfic to organizations looking to create a new project */}

              {/* PRE-AUTHENTICATION */}
              <Route path="/signup/organization" element={<SignUp userType="organization" />} />
              <Route path="/signup/volunteer" element={<SignUp userType="volunteer" />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              {/* Home displays the Dashboard page and the student projects feed */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>

        </BrowserRouter>
      </MantineProvider>


    </>
  )
}

export default App
