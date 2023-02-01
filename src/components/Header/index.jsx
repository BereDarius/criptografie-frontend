import "../../index.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

// using tailwindcss to have logo and username on the same line and spaced apart

function Header() {
	const { user } = useContext(AuthContext);

	return (
		<header className="flex justify-between bg-gray-800 text-white p-4">
			<h1 className="logo text-2xl">Online Banking</h1>
			{user ? (
				<p className="userName text-right">Welcome {user.name}!</p>
			) : (
				<p className="userName text-right">Welcome Guest!</p>
			)}
		</header>
	);
}

export default Header;
