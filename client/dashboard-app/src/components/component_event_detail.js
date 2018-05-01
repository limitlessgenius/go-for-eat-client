
import React, { Component } from 'react'
// import EditForm from './component_edit_form'
import { Modal, Button } from 'react-materialize'

class EventDetail extends Component {

	onClick () {
		console.log('EDIT EVENT')
	}

	render() {
		return (
			<li className={`card event-card ${this.props.customStyle}`}>
				<div className="edit-event-content-section">
					<div className="text-date-day">{this.props.event.date}</div>
				    <div className="text-date-hour">{this.props.event.time}</div>
				    <div className="text-number-seats">{this.props.event.seats}</div>
				</div>
				<div className="edit-event-button-section">
					<Modal
					  header='Edit Event'
					  trigger={
					  	<a className="btn-flat disabled waves-effect waves-light"
						   onClick={this.onClick}
						   className="edit-event-button"
						>EDIT</a>
					  }>
					</Modal>
				</div>
			</li>
		)
	}
}

export default EventDetail


