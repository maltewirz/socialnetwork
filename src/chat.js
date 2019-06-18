import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { ProfilePic } from './profilepic';
import { Link } from 'react-router-dom';
import { socket } from './socket';

export function Chat(props) {
    const [newComment, setNewComment] = useState("");
    const elemRef = useRef();

    useEffect(()=> {
        if (elemRef.current) {
            let bottomPositionComments = elemRef.current.scrollHeight + elemRef.current.offsetHeight;
            elemRef.current.scrollTop = bottomPositionComments;
        }
    });

    function submit() {
        socket.emit("newCommentComing",{
            message: newComment
        });
        setNewComment("");
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
            <div className="chatBox" ref={elemRef}>
                {props.chatMessages && props.chatMessages.map(comment => {
                    return (
                        <div className="profileBox" key={ comment.id }>
                            <div>
                                <ProfilePic
                                    imageUrl={comment.pic_url}
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
            </div>
            <input type="text" value={newComment} onChange={e => handleInput(e)} />
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
