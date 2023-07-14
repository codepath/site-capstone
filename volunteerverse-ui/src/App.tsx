import { MantineProvider } from '@mantine/core';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import './App.css';

function App() {

  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<NavBarOverlay />}> */}
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </MantineProvider>


    </>
  )
}

export default App
