import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ProfilePic } from './profilepic';
import { Link } from 'react-router-dom';


// import { socket } from './socket';

export function Chat(props) {
    // console.log(props.chatMessages);

    if (!props.chatMessages) {
        return <div> Loading </div>;
    }
    console.log(props.chatMessages);

    return(

        <div>
            <h1> Chat </h1>
            {props.chatMessages && props.chatMessages.map(comment => {
                return (
                    <div className="profileBox" key={ comment.id }>
                        <div>
                            <ProfilePic
                                first={comment.first}
                                last={comment.last}
                            />
                        </div>
                        <div className="profileBoxBio">
                            <Link to={"/user/" + comment.user_id}>
                                <div className="profileNameBox">
                                    { comment.first } { comment.last }
                                </div>

                            </Link>
                            <div> {comment.message} </div>
                        </div>
                    </div>
                );
            })}
        </div>

    );
}


const mapStateToProps = state => {
    return {
        chatMessages: state.chatMessages
    };
};


export default connect(mapStateToProps)(Chat);
