import React from 'react';
import axios from "./axios";
import { FriendButton } from './friendbutton';

export class OtherProfile extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        let otherId = this.props.match.params.id;
        try {
            let { data } = await axios.get(`/otherUser/${otherId}`);
            if (data.error) {
                this.setState({
                    error: "Profile does not exist - 404"
                });
            }
            if (data.sameUser) {
                this.props.history.push('/');
            } else {
                this.setState({
                    bio: data.bio,
                    first: data.first,
                    last: data.last,
                    pic_url: data.pic_url,
                    id: data.id
                });
            }
        } catch(err) {
            console.log("err in OtherProfile", err);
        }
    }

    render() {
        return (
            <div>
                <h1> People Profile Viewer </h1>
                {this.state.error}
                {!this.state.error  &&
                    <div className="profileBox">
                        <div>
                            <img src={this.state.pic_url} />
                        </div>
                        <div className="profileBoxBio">
                            <div className="profileNameBox">{this.state.first} {this.state.last}</div>
                            <div> {this.state.bio} </div>
                            <FriendButton
                                myId={this.props.myId}
                                otherId={this.state.id}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}
