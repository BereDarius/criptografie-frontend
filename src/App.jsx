// Styles
import "./index.css";

// Context
import { UserProvider } from "./contexts/UserContext";

// Containers
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Profile from "./containers/Profile";
import Dashboard from "./containers/Dashboard";
import NotFound from "./containers/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
	return (
		<UserProvider>
			<Router>
				<div className="sticky top-0 z-10">
					<Header />
					<Navbar />
				</div>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</UserProvider>
	);
}

export default App;
