import MenuBar from "@src/components/menuBar";
import RegisterSuccess from "@src/components/registerSuccess";

const RegisterSuccessScreen = () => {
    return <div className="flex flex-col h-screen">
        <MenuBar logoOnly={true} />
        <div className="flex flex-1 items-center justify-center">
            <RegisterSuccess />
        </div>
    </div>
}

export default RegisterSuccessScreen;