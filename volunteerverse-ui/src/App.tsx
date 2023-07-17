import { AppShell, Box, Header, MantineProvider, Space, Text } from '@mantine/core';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './App.css';
// import Navbar from './components/Navbar';
import Navbar from './components/Navbar';

function App() {


  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <AppShell
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
