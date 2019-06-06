import React from 'react';


export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props.match.params.id",this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <h1> other profile </h1>
            </div>
        );
    }

}
