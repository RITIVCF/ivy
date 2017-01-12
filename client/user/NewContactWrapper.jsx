import React, { Component } from 'react';
import NewContactForm from './NewContactForm.jsx';


export default class NewContactWrapper extends Component
{
    constructor(props)
    {
        super(props);
        // if(props.route == "/signup"){
        //   this.state = {
        //
        //   };
        // }
    }



    render()
    {
        return (
            <NewContactForm route={this.props.route} />
        );
    }
}
