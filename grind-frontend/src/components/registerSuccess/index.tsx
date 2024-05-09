import Button from "../button";
import PrimaryHeading from "../headings/primaryHeading";
import SecondaryHeading from "../headings/secondaryHeading";

const RegisterSuccess = () => {
    return (
        <div className="flex flex-col items-center lg:bg-background-2 w-full lg:w-1/2 lg:rounded-3xl lg:p-5">
            <div className="flex flex-col items-center py-5">
                <PrimaryHeading text="Registration Successful" />
                <SecondaryHeading text="Click the link below to login" />
            </div>
            <div>
                <Button text="Login" type="primary" onClick={() => {
                    window.location.href = '/sign-in';
                }} />
            </div>
        </div>
    );
}

export default RegisterSuccess;