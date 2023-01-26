import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import "./index.css";

const Login = () => {
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				"https://api-nodejs-todolist.herokuapp.com/user/login",
				{
					email,
					password,
				}
			);
			setUser(data);
			history.push("/dashboard");
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<div className="login">
			<div className="login__container">
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type="submit">Login</button>
				</form>
				{error && <p className="error">{error}</p>}
				<p>
					Don't have an account? <Link to="/register">Register</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
