import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const Dashboard = () => {
	const { user } = useContext(UserContext);
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const fetchTasks = async () => {
		try {
			const { data } = await axios.get(
				"https://api-nodejs-todolist.herokuapp.com/task",
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			setTasks(data);
			setLoading(false);
		} catch (error) {
			setError(error.response.data.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className="dashboard">
			<div className="dashboard__container">
				<h1>Dashboard</h1>
				{error && <p className="error">{error}</p>}
				{loading && <p className="loading">Loading...</p>}
				{tasks.length > 0 && (
					<ul>
						{tasks.map((task) => (
							<li key={task._id}>{task.description}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
