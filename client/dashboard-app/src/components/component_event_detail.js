
import React from 'react'

import { connect } from 'react-redux'

import { editingEvent } from '../actions'

const EventDetail = (props) => {

	const onClick = () => {

		props.editingEvent()
	}

	return (
		<li className="card event-card">
			<div className="edit-event-content-section">
				<div className="text-date-day">DAY DATE</div>
			    <div className="text-date-hour">HOUR DATE</div>
			    <div className="text-number-seats">NUM SEATS</div>
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

const mapDispatchTopProps = () => {

}

export default connect(mapStateToProps, { editingEvent })(EventDetail)


