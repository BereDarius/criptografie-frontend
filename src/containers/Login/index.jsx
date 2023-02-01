import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import "./index.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { user, login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/api/auth/login",
				{
					email,
					password,
				}
			);
			login(response.data);
			navigate("/");
		} catch (error) {
			console.log(error);
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
				<h1 className="text-2xl mb-4">Login</h1>
				<form className="mb-4" onSubmit={handleLogin}>
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
						Login
					</button>
				</form>
				<p className="text-sm mt-4">
					Don't have an account?{" "}
					<Link className="text-indigo-500" to="/register">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
