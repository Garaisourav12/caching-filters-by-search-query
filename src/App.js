import { Route, Routes } from "react-router-dom";
import "./App.css";
import Products from "./Products";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/products" element={<Products />} />
			</Routes>
		</div>
	);
}

export default App;
