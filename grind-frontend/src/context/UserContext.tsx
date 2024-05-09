import React, { createContext, useState, ReactNode, } from 'react';

import UserData from '@src/models/userData';

export const UserContext = createContext<{
	userData: UserData | null;
	setUserData: (userData: UserData | null) => void;
}>({
	userData: null,
	setUserData: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [userData, setUserData] = useState<UserData | null>(null);

	return <UserContext.Provider value={{userData, setUserData}}>{children}</UserContext.Provider>;
};