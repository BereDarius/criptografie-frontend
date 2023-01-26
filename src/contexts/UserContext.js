// user context

import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch("/api/user")
			.then((res) => res.json())
			.then((data) => setUser(data));
	}, []);

	return (
		<UserContext.Provider value={[user, setUser]}>
			{props.children}
		</UserContext.Provider>
	);
};
