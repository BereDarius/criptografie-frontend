// Dashboard component in which a user can transfer money to another user, pay bills, and view their account balance using axios to make requests to the backend

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Dashboard() {
	const { user } = useContext(AuthContext);
	const [balance, setBalance] = useState(0);
	const [bills, setBills] = useState([]);
	const [transfer, setTransfer] = useState({
		amount: 0,
		to: "",
	});

	useEffect(() => {
		axios
			.get("/api/balance")
			.then((res) => {
				console.log(res);
				setBalance(res.data.balance);
			})
			.catch((err) => {
				console.log(err);
			});

		axios
			.get("/api/bills")
			.then((res) => {
				console.log(res);
				setBills(res.data.bills);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleTransfer = (e) => {
		e.preventDefault();
		axios
			.post("/api/transfer", {
				amount: transfer.amount,
				to: transfer.to,
			})
			.then((res) => {
				console.log(res);
				setBalance(res.data.balance);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handlePay = (e) => {
		e.preventDefault();
		axios
			.post("/api/pay", {
				amount: transfer.amount,
			})
			.then((res) => {
				console.log(res);
				setBalance(res.data.balance);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		axios
			.get("/api/balance")
			.then((res) => {
				console.log(res);
				setBalance(res.data.balance);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="flex flex-col items-center mt-10">
			<h1 className="text-2xl font-bold">Welcome {user.name}!</h1>
			<h2 className="text-2xl font-bold">Account Balance: ${balance}</h2>
			<form
				className="flex flex-col items-center mt-10"
				onSubmit={handleTransfer}
			>
				<label htmlFor="amount" className="text-lg font-bold">
					Amount
				</label>
				<input
					type="number"
					name="amount"
					id="amount"
					value={transfer.amount}
					onChange={(e) =>
						setTransfer({ ...transfer, amount: e.target.value })
					}
					className="border border-gray-500 rounded p-2 mt-2"
				/>
				<label htmlFor="to" className="text-lg font-bold mt-2">
					To
				</label>
				<input
					type="text"
					name="to"
					id="to"
					value={transfer.to}
					onChange={(e) =>
						setTransfer({ ...transfer, to: e.target.value })
					}
					className="border border-gray-500 rounded p-2 mt-2"
				/>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
				>
					Transfer
				</button>
			</form>
			<table className="table-auto mt-10">
				<thead>
					<tr>
						<th className="px-4 py-2">Bill</th>
						<th className="px-4 py-2">Amount</th>
						<th className="px-4 py-2">Due Date</th>
						<th className="px-4 py-2">Status</th>
						<th className="px-4 py-2">Pay</th>
					</tr>
				</thead>
				<tbody>
					{bills.map((bill) => (
						<tr key={bill._id}>
							<td className="border px-4 py-2">{bill.name}</td>
							<td className="border px-4 py-2">${bill.amount}</td>
							<td className="border px-4 py-2">{bill.dueDate}</td>
							<td className="border px-4 py-2">{bill.status}</td>
							<td className="border px-4 py-2">
								<button
									onClick={() => handlePay(bill._id)}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								>
									Pay
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Dashboard;
