
import React from 'react'
	
const EventDetail = (props) => {

	const onClick = () => {
		console.log('****')
		console.log(props)
	}

	return (
		<li className="event-card card white">
			<div clasName="card-content">
				<span className="card-title">DAY DATE</span>
			    <div>HOUR DATE</div>
			    <div>NUM SEATS</div>
			</div>
			<div className="card-action edit-event-button">
				<button className="edit-event-button" onClick={() => { onClick() }}>EDIT</button>
			</div>
		</li>
	)
}

export default EventDetail


