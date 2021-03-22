import React, { useState, useEffect } from 'react'
import Ticker from '../components/Ticker'

const Orderbook = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [orders, setOrders] = useState(null)

	const getLastFive = data => {
		return data.slice(data.length - 5, data.length)
	}

	const getFirstFive = data => {
		return data.slice(0, 5)
	}

	useEffect(() => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}

		fetch('/data/data.json', config)
			.then(response => {
				return response.json()
			})
			.then(json => {
				setOrders(json)
			})
			.catch(error => {
				setError(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	if (error) return <h1>There was an error: {error}</h1>
	if (loading) return <h1>Loading...</h1>

	return (
		<div>
			<div className='tableData'>
				{orders && (
					<table>
						<thead>
							<tr>
								<th>Price</th>
								<th>Amount</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{getLastFive(orders.orderbook.bids).map((ele, index) => (
								<tr key={index}>
									<td>{ele.price}</td>
									<td>{ele.amount}</td>
									<td>{`$${(ele.price * ele.amount).toFixed(2)}`}</td>
								</tr>
							))}
							<tr>
								<td colSpan='3'>
									<Ticker />
								</td>
							</tr>
							{getFirstFive(orders.orderbook.asks).map((ele, index) => (
								<tr key={index}>
									<td>{ele.price}</td>
									<td>{ele.amount}</td>
									<td>{`$${(ele.price * ele.amount).toFixed(2)}`}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
}

export default Orderbook
