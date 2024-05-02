import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import z from 'zod';
import { squircle } from "ldrs";

import PrimaryHeading from "@src/components/headings/primaryHeading";
import SecondaryHeading from "../headings/secondaryHeading";
import Button from "../button";
import { registerUser } from "@src/services/backend.service";
import RegisterUserRequest from "@src/models/registerUserRequest";

const registerSchema = z.object({
    firstName: z.string().min(1,'First name is required'),
    lastName: z.string(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    squircle.register();

    return (
        <div className="flex flex-col items-center lg:bg-background-2 w-full lg:w-1/2 lg:rounded-3xl lg:p-5">
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    setIsLoading(true);
                    const { success, message } = await registerUser({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                    } as RegisterUserRequest);
                    if (success) {
                        console.log('User registered successfully');
                    } else {
                        alert(message);
                    }
                    setIsLoading(false);
                    setSubmitting(false);
                }}
                validationSchema={toFormikValidationSchema(registerSchema)}
            >
               {({ errors, touched }) => (
                <Form className="flex flex-col items-center lg:bg-background-2 w-full lg:rounded-3xl lg:py-5">
                    <div className="flex flex-col items-center text-center w-4/5 mb-5">
                        <PrimaryHeading text="Welcome!" />
                        <SecondaryHeading text="Enter your information to get grinding" />
                    </div>
                    <div className="flex justify-between w-4/5 m-1">
                        <div className="w-1/2 mr-1">
                            <Field name="firstName" type="text" placeholder="First Name" className={`w-full p-3 rounded-xl bg-input text-text focus:outline-none focus:ring-2 focus:ring-primary ${errors.firstName && touched.firstName ? 'border-2 border-error' : ""}`} />
                            {errors.firstName && touched.firstName && <div className="text-error">{errors.firstName}</div>}
                        </div>
                        <div className="w-1/2 ml-1">
                            <Field name="lastName" type="text" placeholder="Last Name (Optional)" className={`w-full p-3 rounded-xl bg-input text-text focus:ring-2 focus:ring-primary`}/>
                        </div>
                    </div>
                    <div className="w-4/5 m-1">
                        <Field name="email" type="email" placeholder="Email" className={`w-full p-3 rounded-xl bg-input text-text focus:ring-2 focus:ring-primary ${errors.email && touched.email ? "border-2 border-error" : ""}`}/>
                        {errors.email && touched.email && <div className="text-error">{errors.email}</div>}
                    </div>
                    <div className="w-4/5 m-1">
                        <Field name="password" type="password" placeholder="Password" className={`w-full p-3 rounded-xl bg-input text-text focus:ring-2 focus:ring-primary ${errors.password && touched.password ? "border-2 border-error" : ""}`}/>
                        {errors.password && touched.password && <div className="text-error">{errors.password}</div>}
                    </div>
                    <div className="w-4/5 m-1">
                        <Field name="confirmPassword" type="password" placeholder="Confirm Password" className={`w-full p-3 rounded-xl bg-input text-text focus:ring-2 focus:ring-primary ${errors.confirmPassword && touched.confirmPassword ? "border-2 border-error" : ""}`}/>
                        {errors.confirmPassword && touched.confirmPassword && <div className="text-error">{errors.confirmPassword}</div>}
                    </div>
                    <div className="py-5">
                        {!isLoading && <Button text="Register" onClick={() => {}} type="primary" />}
                        {isLoading && <l-squircle color="#007FFF" stroke={8} size={50}/>}
                    </div>
                </Form>
                )} 
            </Formik>
        </div>
    );
}

export default RegisterForm;