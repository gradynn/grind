import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import './App.css';

import Home from '@src/screens/home'
import NotFound from '@src/screens/notFound'

interface Screen {
  name: string;
  path: string;
  component: JSX.Element;
}

const screens: Screen[] = [
  {
    name: 'Home',
    path: '/home',
    component: <Home />
  },
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {screens.map((screen) => (
          <Route key={screen.name} path={screen.path} element={screen.component} />
        ))}
        <Route path="/" element={<RedirectToHome />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

const RedirectToHome = () => {
  useEffect(() => {
    window.location.href = '/home';
  }, []);
  
  return <></>
}

export default App
