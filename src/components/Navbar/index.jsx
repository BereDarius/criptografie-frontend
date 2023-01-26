import React, { useContext } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
	const { user, setUser } = useContext(UserContext);

	const handleLogout = () => {
		setUser(null);
	};

	return (
		<nav className="navbar bg-gray-800 text-white p-4">
			<ul className="nav-links flex flex-row justify-between text-blue-500">
				<div className="flex flex-row">
					<li className="pr-4 hover:text-blue-800">
						<Link to="/">Home</Link>
					</li>
					<li className="pr-4 hover:text-blue-800">
						<Link to="/profile">Profile</Link>
					</li>
				</div>
				{user ? (
					<li className="pr-4 hover:text-blue-800">
						<Link to="/" onClick={handleLogout}>
							Logout
						</Link>
					</li>
				) : (
					<div className="flex flex-row">
						<li className="pr-4 hover:text-blue-800">
							<Link to="/login">Login</Link>
						</li>
						<li className="pr-4 hover:text-blue-800">
							<Link to="/register">Register</Link>
						</li>
					</div>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
