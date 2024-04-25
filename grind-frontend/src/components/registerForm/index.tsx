import { Formik, Form, Field } from "formik";

import PrimaryHeading from "@src/components/headings/primaryHeading";
import SecondaryHeading from "../headings/secondaryHeading";
import Button from "../button";

const RegisterForm = () => {
    return (
        <div className="flex flex-col items-center lg:bg-background-2 lg:w-1/2 lg:rounded-3xl lg:p-5">
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="flex flex-col items-center w-full lg:bg-background-2 w-full lg:rounded-3xl lg:p-5">
                        <div className="flex flex-col items-center text-center w-3/4 mb-5">
                            <PrimaryHeading text="Welcome!" />
                            <SecondaryHeading text="Enter your information to get grinding" />
                        </div>

                        <div className="flex items-center justify-between w-3/4 m-1">
                            <Field name="firstname" type="text" placeholder="First Name" className="w-1/2 p-3 rounded-xl mr-1 bg-gray-500 text-white"/>
                            {errors.firstname && touched.firstname ? <div>{errors.firstname}</div> : null}
                            <Field name="lastname" type="text" placeholder="Last Name"  className="w-1/2 p-3 rounded-xl ml-1"/>
                            {errors.lastname && touched.lastname ? <div>{errors.lastname}</div> : null}
                        </div>

                        <Field name="email" type="email" placeholder="Email" className="w-3/4 m-1 p-3 rounded-xl"/>
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}

                        <Field name="password" type="password" placeholder="Password" className="w-3/4 m-1 p-3 rounded-xl"/>
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}

                        <Field name="confirmPassword" type="password" placeholder="Confirm Password" className="w-3/4 m-1 p-3 rounded-xl"/>
                        {errors.confirmPassword && touched.confirmPassword ? <div>{errors.confirmPassword}</div> : null}

                        <button type="submit" className="mt-5">
                            <Button text="Register" onClick={() => {}} type="primary" />
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegisterForm;