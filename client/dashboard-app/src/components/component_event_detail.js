
import React from 'react'
import { connect } from 'react-redux'
import { editingEvent } from '../actions'

const EventDetail = (props) => {

	const { event, customStyle } = props // date, location, name, seats, time

	console.log('EVENT', event)

	const onClick = () => {
		props.editingEvent()
	}

	return (
		<li className={`card event-card ${props.customStyle}`}>
			<div className="edit-event-content-section">
				<div className="text-date-day">{event.date}</div>
			    <div className="text-date-hour">{event.time}</div>
			    <div className="text-number-seats">{event.seats}</div>
			</div>
			<div className="edit-event-button-section">
				<a className="btn-flat disabled waves-effect waves-light"
				   onClick={onClick}
				   className="edit-event-button"
				>EDIT</a>
			</div>
		</li>
	)
}

const mapStateToProps = (state) => {
	const { editEvent } = state
	return { editEvent }
}

export default connect(mapStateToProps, { editingEvent })(EventDetail)


