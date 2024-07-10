import NavBar from "@src/components/navBar";
import LoginForm from "@src/components/loginForm";

const LoginScreen = () => {
    return <div className="flex flex-col h-screen">
        <NavBar logoOnly={true} />
        <div className="flex flex-1 items-center justify-center">
            <LoginForm />
        </div>
    </div>
}

export default LoginScreen;