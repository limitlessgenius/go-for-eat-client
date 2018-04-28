


import React, { Component } from 'react'

class OptionsList extends Component {
	render() {
		return (
			<div className="options-dashboard">
				<ul className="options-list tabs">
					<li className="tab option-detail">ALL</li>
					<li className="tab option-detail">PAST</li>
					<li className="tab option-detail">TODAY</li>
					<li className="tab option-detail">FUTURE</li>
				</ul>
			</div>
		)
	}
}

export default OptionsList
