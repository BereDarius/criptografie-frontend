import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
	const { user, login, logout } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"http://localhost:5000/api/auth/register",
				{
					email,
					password,
				}
			);
			login(data);
			history("/dashboard");
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<div
			className="flex justify-center h-screen bg-gray-200"
			style={{
				height: "calc(100vh - 120px)",
			}}
		>
			<div className="w-1/3 p-6 bg-white">
				<h1 className="text-2xl mb-4">Register</h1>
				<form className="mb-4" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-4"
					/>
					<button
						type="submit"
						className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4"
					>
						Register
					</button>
				</form>
				{error && (
					<p className="error text-red-500 text-sm mt-2">{error}</p>
				)}
				<p className="text-sm mt-4">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-indigo-500 hover:text-indigo-700"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
