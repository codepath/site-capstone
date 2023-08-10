import { AppShell, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import { AuthenticationContext } from './context/AuthenicationContext';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CreateProject from './pages/Org/CreateProject';
import OrgHome from './pages/Org/Home/OrgHome';
import OrgProjectDetailsTabs from './pages/Org/OrgProjectDetails/OrgProjectTabs';
import SignUp from './pages/SignUp/SignUp';
import VolunteerHome from './pages/Volunteer/Home/VolunteerHome';
import MyProjects from './pages/Volunteer/MyProjects';
import VolunteerProjectDetails from './pages/Volunteer/VolunteerProjectDetails';
import { useAuthentication } from './services/hooks/useAuthentication';

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
  const authProps = useAuthentication();
  console.log(authProps)
  const { isValidOrg, isAuth } = authProps;
  return (
    <>
      <AuthenticationContext.Provider value={authProps}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{
          primaryColor: "violet",
          globalStyles: (() => ({
            /** incase it's needed */
          }))
        }}>
          <BrowserRouter>
            <Notifications />
            <AppShell pl={0} pr={0}
              styles={(theme) => ({
                main: { padding: "initial 0"},
                root: {
                  height: "100%",
                  backgroundImage: !authProps?.isAuth ? theme.fn.linearGradient(180, theme.colors.violet[5], theme.colors.violet[0], theme.white, theme.colors.violet[2])
                    : theme.fn.linearGradient(180, theme.colors.violet[0], theme.colors.violet[0])
                }
              })}
              header={<Navbar />}>
              <Routes>
                <Route path="/" element={
                  !isAuth ? <Landing /> :
                    isValidOrg ? <OrgHome />
                      : <VolunteerHome />
                } />

                {/* POST AUTHENTICATION */}
                {/* Displays project by details page for each user role */}
                <Route path="/projects" element={<MyProjects />} />
                {/* projects is  specific to the volunteers */}
                <Route path="/projects/:projectId" element={
                  !isAuth ? <Landing /> :
                    isValidOrg ? <OrgProjectDetailsTabs />
                      : <VolunteerProjectDetails />} />
                {/* projects/projectId is used for both volunteers and organizations */}
                <Route path="/projects/create" element={<CreateProject />} />
                {/* projects/create is specfic to organizations looking to create a new project */}

                {/* PRE-AUTHENTICATION */}
                <Route path="/signup/organization" element={<SignUp userType='organization' />} />
                <Route path="/signup/volunteer" element={<SignUp userType='volunteer' />} />
                <Route path="/login" element={<Login />} />
                {/* Home displays the Dashboard page and the student projects feed */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppShell>

          </BrowserRouter>
        </MantineProvider>
      </AuthenticationContext.Provider>


    </>
  )
}

export default App
