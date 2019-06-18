import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ProfilePic } from './profilepic';
import { Link } from 'react-router-dom';
import { socket } from './socket';

export function Chat(props) {
    const [newComment, setNewComment] = useState("");

    function submit() {
        socket.emit("newCommentComing",{
            message: newComment
        });
    }

    function handleInput({ target }) {
        setNewComment(target.value);
    }

    if (!props.chatMessages) {
        return <div> Loading </div>;
    }

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
                            <div> { comment.message } </div>
                            <div> { comment.created_at} </div>
                        </div>
                    </div>
                );
            })}
            <input type="text" onChange={e => handleInput(e)} />
            <button type="submit" onClick={() => submit()}> Add Comment </button>
        </div>

    );
}

const mapStateToProps = state => {
    return {
        chatMessages: state.chatMessages
    };
};

export default connect(mapStateToProps)(Chat);
