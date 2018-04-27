
import React from 'react'
	
const EventDetail = (props) => {

	const onClick = () => {
		console.log('****')
		console.log(props)
	}

	return (
		<li className="event-card">
			<h2>DAY DATE</h2>
			<h4>HOUR DATE</h4>
			<h5>NUM SEATS</h5>
			<hr />
			<div className="edit-event-button">
				<button onClick={() => { onClick() }}>EDIT</button>
			</div>
		</li>
	)
}

export default EventDetail
