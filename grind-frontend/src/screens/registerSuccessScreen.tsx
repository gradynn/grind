import NavBar from "@src/components/navBar";
import RegisterSuccess from "@src/components/registerSuccess";

const RegisterSuccessScreen = () => {
    return <div className="flex flex-col h-screen">
        <NavBar logoOnly={true} />
        <div className="flex flex-1 items-center justify-center">
            <RegisterSuccess />
        </div>
    </div>
}

export default RegisterSuccessScreen;