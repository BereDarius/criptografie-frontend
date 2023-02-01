import React, { useContext } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
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
					<li className="pr-4 hover:text-blue-800">
						<Link to="/dashboard">Dashboard</Link>
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
