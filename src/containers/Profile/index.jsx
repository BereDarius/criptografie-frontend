import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

function Profile() {
	const { user } = useContext(AuthContext);
	const [balance, setBalance] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const [edit, setEdit] = useState(false);
	const [deleteAccount, setDeleteAccount] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	const [userUpdate, setUserUpdate] = useState({
		name: user.name,
		email: user.email,
		iban: user.iban,
	});

	const handleEdit = (e) => {
		e.preventDefault();
		axios
			.post("/api/edit", {
				name: userUpdate.name,
				email: userUpdate.email,
				iban: userUpdate.iban,
			})
			.then((res) => {
				console.log(res);
				setEdit(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = (e) => {
		e.preventDefault();
		axios
			.post("/api/delete")
			.then((res) => {
				console.log(res);
				setDeleteAccount(false);
				setDeleteConfirm(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.get("/api/transactions")
			.then((res) => {
				console.log(res);
				setTransactions(res.data.transactions);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="container mx-auto mt-10">
			<div className="flex flex-col">
				<h1 className="text-3xl font-medium mb-10">Profile</h1>
				{deleteConfirm ? (
					<div className="bg-green-500 text-white p-4 rounded-lg mb-10">
						Account deleted successfully!
					</div>
				) : (
					""
				)}
				{edit ? (
					<form
						onSubmit={handleEdit}
						className="bg-white p-6 rounded-lg shadow-md"
					>
						<h2 className="text-lg font-medium mb-4">
							Edit Profile
						</h2>
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block text-gray-700 font-medium mb-2"
							>
								Name
							</label>
							<input
								type="text"
								className="w-full border border-gray-400 p-2 rounded-lg"
								id="name"
								value={userUpdate.name}
								onChange={(e) =>
									setUserUpdate({
										...userUpdate,
										name: e.target.value,
									})
								}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 font-medium mb-2"
							>
								Email address
							</label>
							<input
								type="email"
								className="w-full border border-gray-400 p-2 rounded-lg"
								id="email"
								value={userUpdate.email}
								onChange={(e) =>
									setUserUpdate({
										...userUpdate,
										email: e.target.value,
									})
								}
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="iban"
								className="block text-gray-700 font-medium mb-2"
							>
								IBAN
							</label>
							<input
								type="text"
								className="w-full border border-gray-400 p-2 rounded-lg"
								id="iban"
								value={userUpdate.iban}
								onChange={(e) =>
									setUserUpdate({
										...userUpdate,
										iban: e.target.value,
									})
								}
							/>
						</div>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
						>
							Save
						</button>
					</form>
				) : (
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-lg font-medium mb-4">Profile</h2>
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block text-gray-700 font-medium mb-2"
							>
								Name
							</label>
							<input
								type="text"
								className="w-full border border-gray-400 p-2 rounded-lg"
								id="name"
								value={user.name}
								disabled
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 font-medium mb-2"
							>
								Email address
							</label>
							<input
								type="email"
								className="w-full border border-gray-400 p-2 rounded-lg"
								id="email"
								value={user.email}
								disabled
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="iban"
								className="block text-gray-700 font-medium mb-2"
							>
								IBAN
							</label>
							<input
								type="text"
								className="w-full border border-gray-400 p-2 rounded-lg"
								id="iban"
								value={user.iban}
								disabled
							/>
						</div>
						<button
							onClick={() => setEdit(true)}
							className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
						>
							Edit
						</button>
					</div>
				)}
				<div className="bg-white p-6 rounded-lg shadow-md mt-10">
					<h2 className="text-lg font-medium mb-4">Transactions</h2>
					{transactions.length > 0 ? (
						<table className="w-full">
							<thead>
								<tr>
									<th className="text-left py-2">Date</th>
									<th className="text-left py-2">Amount</th>
									<th className="text-left py-2">
										Description
									</th>
								</tr>
							</thead>
							<tbody>
								{transactions.map((transaction) => (
									<tr key={transaction.id}>
										<td className="border-t">
											{new Date(
												transaction.date
											).toLocaleDateString()}
										</td>
										<td className="border-t">
											{transaction.amount}
										</td>
										<td className="border-t">
											{transaction.description}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p className="text-center">No transactions yet</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Profile;
