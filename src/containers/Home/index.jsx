import "../../index.css";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Home = () => {
	const { user } = useContext(UserContext);

	return (
		<div
			className="flex flex-col justify-center items-center"
			style={{
				height: "calc(100vh - 120px)",
			}}
		>
			<h1 className="text-4xl">Welcome to Online Banking</h1>
			<p className="text-2xl">Please login or register to continue</p>
			<div className="flex flex-row justify-center items-center">
				{!user ? (
					<>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
							<a href="/login">Login</a>
						</button>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
							<a href="/register">Register</a>
						</button>
					</>
				) : (
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
						<a href="/profile">Profile</a>
					</button>
				)}
			</div>
		</div>
	);
};

export default Home;
