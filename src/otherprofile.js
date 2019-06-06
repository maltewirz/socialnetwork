import React from 'react';
import axios from "./axios";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        let otherId = this.props.match.params.id;
        try {
            let { data } = await axios.get(`/otherUser/${otherId}`);
            if (data.sameUser) {
                this.props.history.push('/');
            } else {
                this.setState({
                    bio: data.bio,
                    first: data.first,
                    last: data.last,
                    pic_url: data.pic_url
                });
            }        
        } catch(err) {
            console.log("err in OtherProfile", err);
        }
    }

    render() {
        return (
            <div>
                <h1> other profile </h1>
                <div className="profileBox">
                    <div>
                        <img src={this.state.pic_url} />
                    </div>
                    <div className="profileBoxBio">
                        <div className="profileNameBox">{this.state.first} {this.state.last}</div>
                        <div> {this.state.bio} </div>
                    </div>
                </div>
            </div>
        );
    }

}
