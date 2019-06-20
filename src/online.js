import React from 'react';
import { Link } from 'react-router-dom';
import { ProfilePic } from './profilepic';
import { connect } from 'react-redux';

export class Online extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        console.log(this.props.usersOnline);
        return (
            <div>
                <h1> Online Users </h1>
                {this.props.usersOnline && this.props.usersOnline.map(user => {
                    return (
                        <div className="profileBox" key={ user.id }>
                            <div>
                                <ProfilePic
                                    imageUrl={user.picurl}
                                    first={user.first}
                                    last={user.last}
                                />
                            </div>
                            <div className="profileBoxBio">
                                <Link to={"/user/" + user.id}>
                                    <div className="profileNameBox">
                                        { user.first } { user.last }
                                    </div>
                                </Link>
                                <Link to={"/privatechat/" + user.id}><button> Private Chat </button></Link>
                            </div>
                        </div>
                    );
                })}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        usersOnline: state.usersOnline
    };
};

export default connect(mapStateToProps)(Online);
