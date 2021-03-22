import React, { useState, useEffect } from 'react'

const Ticker = () => {
	const [price, setPrice] = useState(0)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setPrice(Math.random() * 100 + 2000)
		}, 5000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	return (
		<div className='ticker'>
			<div className='price'>${price.toFixed(2)}</div>
		</div>
	)
}

export default Ticker
