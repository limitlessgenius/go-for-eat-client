
import React from 'react'

import { connect } from 'react-redux'

import { editingEvent } from '../actions'



const EventDetail = (props) => {

	const onClick = () => {

		props.editingEvent()
	}

	console.log('INNER STATE', props)

	return (
		<li className="event-card card white">
			<div clasName="card-content">
				<span className="card-title">DAY DATE</span>
			    <div>HOUR DATE</div>
			    <div>NUM SEATS</div>
			</div>
			<div className="card-action edit-event-button">
				<button 
					className="edit-event-button" 
					onClick={onClick}
				>EDIT</button>
			</div>
		</li>
	)
}

const mapStateToProps = (state) => {
	const { editEvent } = state
	return { editEvent }
}



export default connect(mapStateToProps, { editingEvent })(EventDetail)


