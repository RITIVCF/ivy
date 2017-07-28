import React, {Component} from 'react';

export default class Response extends Component {
	render() {
		let response = this.props.response;
		return (
			<table border={1}>
				<tbody>
					<tr>
						<td><b>Question:</b><br />{response.text}</td>
						<td><b>Value:</b><br />{response.value}</td>
					</tr>
					<tr colSpan={"2"}><td><b>Comment:</b><br/>{response.comment}</td></tr>
				</tbody>
			</table>
		)
	}
}
