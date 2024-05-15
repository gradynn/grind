import LoginUserRequest from "@src/models/loginUserRequest";
import RegisterUserRequest from "@src/models/registerUserRequest";
import { UserData } from "@src/models/userData";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const registerUser = async (userData: RegisterUserRequest): Promise<{ success: boolean; message: string }> => {
		console.log(userData);
		try {
		const response = await fetch(`${serverUrl}/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			const data = await response.json();
			return { success: true, message: data.message };
		} else if (response.status === 409) {
			const data = await response.json();
			return { success: false, message: data.message };
		} else {
			throw new Error('Internal server error');
		}
	} catch (error) {
		return { success: false, message: 'An error occurred while registering user' };
	}
}

export const loginUser = async (userData: LoginUserRequest): Promise<string | undefined> => {
	try {
		console.log(userData);
		const response = await fetch(`${serverUrl}/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();
		return data.data.token;
	} catch (error) {
		throw new Error('Something went wrong, please try again later');
		return '';
	}
}

export const getUserData = async (token: string): Promise<UserData> => {
	try {
		const response = await fetch(`${serverUrl}/user/user-data`, {
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});

		const data = await response.json();

		return {
			firstName: data.data.user.firstName,
			lastName: data.data.user.lastName,
			email: data.data.user.email,
			tasks: data.data.user.tasks,
		} as UserData;
	} catch (error) {
		throw new Error('An error occurred while fetching profile data');
		return { firstName: '', lastName: '', email: '', tasks: []};
	}
};