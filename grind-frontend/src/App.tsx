import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import './App.css';

import Home from '@src/screens/home';
import NotFound from '@src/screens/notFound';
import Register from "@src/screens/register";
import RegisterSuccessScreen from "@src/screens/registerSuccessScreen";
import LoginScreen from "@src/screens/loginScreen";
import { UserProvider } from "./context/UserContext";

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
	{
		name: 'Register',
		path: '/register',
		component: <Register />
	},
	{
		name: 'RegisterSuccess',
		path: '/register-success',
		component: <RegisterSuccessScreen />
	},
	{
		name: 'Login',
		path: '/sign-in',
		component: <LoginScreen />
	}
]

function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					{screens.map((screen) => (
						<Route key={screen.name} path={screen.path} element={screen.component} />
					))}
					<Route path="/" element={<RedirectToHome />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	)
}

const RedirectToHome = () => {
	useEffect(() => {
		window.location.href = '/home';
	}, []);
	
	return <></>
}

export default App
