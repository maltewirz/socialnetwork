import React from 'react';
import { connect } from 'react-redux';
import { ProfilePic } from './profilepic';
import { Link } from 'react-router-dom';
import { socket } from './socket';


export class PrivateChat extends React.Component {

    constructor() {
        super();
        this.state = {};
        this.submit = this.submit.bind(this);
        this.elemRef = React.createRef();
    }

    updateView() {
        if (this.elemRef.current) {
            let bottomPositionComments = this.elemRef.current.scrollHeight + this.elemRef.current.offsetHeight;
            this.elemRef.current.scrollTop = bottomPositionComments;
        }
    }

    componentDidMount() {
        socket.emit("loadPrivateMessages", {
            targetId: this.props.match.params.id
        });
        window.addEventListener('keydown', this.submit);

    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.submit);

    }

    submit(e) {
        if (e.keyCode === 13) {
            socket.emit("newPrivateMessage",{
                message: this.state.newMessage,
                targetId: this.props.match.params.id
            });
        }
    }

    handleInput({ target }) {
        this.updateView();
        this.setState({
            newMessage: target.value
        });
    }

    render() {
        return(
            <div>
                <h1> Private Chat </h1>
                <div className="chatBox" ref={this.elemRef}>
                    {this.props.privateChatMessages && this.props.privateChatMessages.map(comment => {
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
                                    <div> { comment.createdat } </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <input type="text"  onChange={e => this.handleInput(e)} />
                <button type="submit" onClick={() => this.submit()}> Add Message </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        privateChatMessages: state.privateChatMessages
    };
};

export default connect(mapStateToProps)(PrivateChat);
