import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Use `useNavigate` instead of `useHistory`
import queryString from "query-string";

function doFilter(products, filterObject) {
	console.log(filterObject);

	return products.filter((product) => {
		let matches = true;
		if (filterObject.category) {
			matches = matches && product.category === filterObject.category;
		}
		if (filterObject.minPrice) {
			matches = matches && product.price >= filterObject.minPrice;
		}
		if (filterObject.maxPrice) {
			matches = matches && product.price <= filterObject.maxPrice;
		}
		if (filterObject.stockAvailable !== undefined) {
			matches =
				matches && product.stock > 0 === filterObject.stockAvailable;
		}
		if (filterObject.brand) {
			matches =
				matches &&
				new RegExp(filterObject.brand, "i").test(product.brand);
		}
		return matches;
	});
}

const products = [
	{
		id: 1,
		name: "Wireless Headphones",
		category: "Electronics",
		price: 199.99,
		stock: 35,
		rating: 4.5,
		brand: "SoundX",
		color: "Black",
		createdAt: "2023-09-01",
		updatedAt: "2023-09-15",
	},
	{
		id: 2,
		name: "Gaming Laptop",
		category: "Computers",
		price: 1499.99,
		stock: 12,
		rating: 4.8,
		brand: "GameTech",
		color: "Gray",
		createdAt: "2023-08-20",
		updatedAt: "2023-09-10",
	},
	{
		id: 3,
		name: "Smartphone",
		category: "Electronics",
		price: 799.99,
		stock: 0,
		rating: 4.2,
		brand: "MobilePro",
		color: "Blue",
		createdAt: "2023-07-15",
		updatedAt: "2023-09-05",
	},
	{
		id: 4,
		name: "4K TV",
		category: "Electronics",
		price: 1299.99,
		stock: 20,
		rating: 4.7,
		brand: "VisionTech",
		color: "Black",
		createdAt: "2023-06-10",
		updatedAt: "2023-09-20",
	},
	{
		id: 5,
		name: "Bluetooth Speaker",
		category: "Electronics",
		price: 99.99,
		stock: 50,
		rating: 4.0,
		brand: "SoundX",
		color: "Red",
		createdAt: "2023-09-25",
		updatedAt: "2023-09-26",
	},
	{
		id: 6,
		name: "Mechanical Keyboard",
		category: "Accessories",
		price: 89.99,
		stock: 45,
		rating: 4.6,
		brand: "KeyPro",
		color: "White",
		createdAt: "2023-09-05",
		updatedAt: "2023-09-15",
	},
	{
		id: 7,
		name: "Curved Monitor",
		category: "Computers",
		price: 499.99,
		stock: 22,
		rating: 4.3,
		brand: "ViewMaster",
		color: "Black",
		createdAt: "2023-08-01",
		updatedAt: "2023-09-18",
	},
	{
		id: 8,
		name: "Fitness Tracker",
		category: "Wearables",
		price: 59.99,
		stock: 70,
		rating: 4.1,
		brand: "FitTrack",
		color: "Gray",
		createdAt: "2023-09-12",
		updatedAt: "2023-09-28",
	},
];

function Products() {
	const location = useLocation();
	const navigate = useNavigate(); // Replace useHistory with useNavigate

	const filterObject = useMemo(() => {
		const queryObject = queryString.parse(location.search);
		queryObject.stockAvailable =
			queryObject.stockAvailable === "true" ? true : undefined;
		return queryObject;
	}, [location]);

	// Update URL when filters change
	const changeSearchParams = useCallback(
		(filterObject) => {
			const queryStringified = queryString.stringify(filterObject);

			navigate({
				pathname: location.pathname,
				search: queryStringified ? `?${queryStringified}` : "",
			});
		},
		[location]
	);

	// Memoized filtered products
	const filteredProducts = useMemo(() => {
		return doFilter(products, filterObject);
	}, [products, location]);

	console.log(filteredProducts);

	// Event handlers for updating filter values
	const handleCategoryChange = (e) => {
		filterObject.category = e.target.value ? e.target.value : undefined;
		changeSearchParams(filterObject);
	};

	const handleMinPriceChange = (min) => {
		filterObject.minPrice = min ? min : undefined;
		changeSearchParams(filterObject);
	};

	const handleMaxPriceChange = (max) => {
		filterObject.maxPrice = max ? max : undefined;
		changeSearchParams(filterObject);
	};

	const handleStockChange = (e) => {
		filterObject.stockAvailable = e.target.checked ? true : undefined;
		changeSearchParams(filterObject);
	};

	const handleBrandChange = (e) => {
		filterObject.brand = e.target.value ? e.target.value : undefined;
		changeSearchParams(filterObject);
	};

	return (
		<div>
			<h1>Products</h1>

			{/* Filters */}
			<div>
				<select
					value={filterObject.category}
					onChange={handleCategoryChange}
				>
					<option value="">All Categories</option>
					<option value="Electronics">Electronics</option>
					<option value="Computers">Computers</option>
					<option value="Accessories">Accessories</option>
					<option value="Wearables">Wearables</option>
				</select>

				<div>
					<label>Price Range:</label>
					<input
						type="number"
						placeholder="Min"
						value={
							!isNaN(filterObject.minPrice)
								? filterObject.minPrice
								: ""
						}
						onChange={(e) => handleMinPriceChange(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Max"
						value={
							!isNaN(filterObject.maxPrice)
								? filterObject.maxPrice
								: ""
						}
						onChange={(e) => handleMaxPriceChange(e.target.value)}
					/>
				</div>

				<div>
					<label>In Stock:</label>
					<input
						type="checkbox"
						checked={filterObject.stockAvailable ? true : false}
						onChange={handleStockChange}
					/>
				</div>

				<div>
					<label>Brand:</label>
					<input
						type="text"
						value={filterObject.brand ? filterObject.brand : ""}
						onChange={handleBrandChange}
					/>
				</div>
			</div>

			{/* Filtered Products */}
			<div>
				{filteredProducts.map((product) => (
					<p key={product.id}>{product.name}</p>
				))}
			</div>
		</div>
	);
}

export default Products;
