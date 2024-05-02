interface RegisterUserRequest {
    firstName: string;
    lastName: string | null;
    email: string;
    password: string;
}

export default RegisterUserRequest;