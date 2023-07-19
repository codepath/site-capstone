import { AppShell, Box, Header, MantineProvider, Space, Text } from '@mantine/core';
import Landing from './pages/Landing/Landing';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './App.css';
// import Navbar from './components/Navbar';
import Navbar from './components/Navbar';

function App() {
// Appshell is used to navbar overlay across all pages 
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{primaryColor : "violet"}}>
        <BrowserRouter>
          <AppShell pl={0} pr={0}
          styles={(theme) => ({
            main: {paddingLeft : 0, paddingRight: 0},
            root: { height: "100%", backgroundImage: theme.fn.gradient({from: theme.primaryColor,  to: theme.white, deg: 180})}
          })}
            header={<Navbar />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
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
