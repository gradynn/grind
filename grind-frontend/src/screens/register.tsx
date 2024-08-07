import NavBar from "@src/components/navBar";
import RegisterForm from "@src/components/registerForm";

const Register = () => {
    return <div className="flex flex-col h-screen">
        <NavBar logoOnly={true} />
        <div className="flex flex-1 items-center justify-center">
            <RegisterForm />
        </div>
    </div>
}

export default Register;