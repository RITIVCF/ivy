import React, {Component} from 'react';

export default class ResolutionSingle extends Component {
    render() {
        return (
            <li><input type="checkbox"></input>
                {this.props.resolution.text}
                {this.props.resolution.complete.toString()}
            </li>
        )
    }

}
