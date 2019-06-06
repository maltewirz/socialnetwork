import React from 'react';
import axios from "./axios";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        console.log("this.props.match.params.id",this.props.match.params.id);
        let otherId = this.props.match.params.id;
        try {
            let { data } = await axios.get("/otherUser");
            console.log("data", data);
        } catch(err) {
            console.log("err in OtherProfile", err);
        }
    }

    render() {
        return (
            <div>
                <h1> other profile </h1>
                <div className="profileBox">
                    <div> pic here</div>
                    <div className="profileBoxBio">
                        <div className="profileNameBox"> first, last </div>
                        <div> bio here  </div>
                    </div>
                </div>
            </div>
        );
    }

}
