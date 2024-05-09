import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from 'zod';
import { squircle } from "ldrs";

import PrimaryHeading from "@src/components/headings/primaryHeading";
import Button from "../button";
import { loginUser } from "@src/services/backend.service";
import LoginUserRequest from "@src/models/loginUserRequest";
import { useAuth } from "@src/utils/useAuth";

const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1),
  });

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthToken } = useAuth();

    squircle.register();

    return (
        <div className="flex flex-col items-center lg:bg-background-2 w-full lg:w-1/2 lg:rounded-3xl lg:p-5 max-w-[700px]">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    setIsLoading(true);
                    try {
                        const token = await loginUser({
                            email: values.email,
                            password: values.password,
                        } as LoginUserRequest);
                        if (token) {
                            setAuthToken(token);
                        }
                        window.location.href = '/home';
                    } catch (error) {
                        setIsLoading(false);
                        alert(error);
                    }
                    setSubmitting(false);
                }}
                validationSchema={toFormikValidationSchema(registerSchema)}
            >
               {({ errors, touched }) => (
                <Form className="flex flex-col items-center lg:bg-background-2 w-full lg:rounded-3xl lg:py-5">
                    <div className="flex flex-col items-center text-center w-4/5 lg:w-2/3 mb-5">
                        <PrimaryHeading text="Welcome Back!" />
                    </div>
                    <div className="w-4/5 lg:w-2/3 m-1">
                        <Field name="email" type="email" placeholder="Email" className={`w-full p-3 rounded-xl bg-input text-text focus:ring-2 focus:ring-primary ${errors.email && touched.email ? "border-2 border-error" : ""}`}/>
                        {errors.email && touched.email && <div className="text-error">{errors.email}</div>}
                    </div>
                    <div className="w-4/5 lg:w-2/3 m-1">
                        <Field name="password" type="password" placeholder="Password" className={`w-full p-3 rounded-xl bg-input text-text focus:ring-2 focus:ring-primary ${errors.password && touched.password ? "border-2 border-error" : ""}`}/>
                        {errors.password && touched.password && <div className="text-error">{errors.password}</div>}
                    </div>
                    <div className="py-5">
                        {!isLoading && <Button text="Login" onClick={() => {}} type="primary" submit={true} />}
                        {isLoading && <l-squircle color="#007FFF" stroke={8} size={50}/>}
                    </div>
                </Form>
                )} 
            </Formik>
        </div>
    );
}

export default LoginForm;