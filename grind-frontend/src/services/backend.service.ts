import RegisterUserRequest from "@src/models/registerUserRequest";

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
    console.error('Error registering user:', error);
    return { success: false, message: 'An error occurred while registering user' };
  }
}