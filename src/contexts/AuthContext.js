import React, { createContext, useState } from "react";

export const AuthContext = createContext({
	user: null,
	login: (user) => {},
	logout: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState({
		name: "John Doe",
		email: "john@doe.com",
		iban: "NL00INGB0000000000",
	});

	const login = (user) => {
		setUser(user);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
