import { AppShell, Box, Header, MantineProvider, Space, Text } from '@mantine/core';
import Landing from './pages/Landing/Landing';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';

function App() {
  /**
   * @todo: create API class to make a register and login requests to backend
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
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{primaryColor : "violet"}}>
        <BrowserRouter>
          <AppShell pl={0} pr={0}
          styles={(theme) => ({
            main: {padding : "initial 0"},
            root: { 
              height: "100%",
              backgroundImage: theme.fn.gradient({from: theme.primaryColor,  to: theme.white, deg: 180}),
            }
          })}
            header={<Navbar />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup/organization" element={<SignUp userType="organization" />} />
            <Route path="/signup/volunteer" element={<SignUp userType="volunteer"/>} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </AppShell>

        </BrowserRouter>
      </MantineProvider>


    </>
  )
}

export default App
