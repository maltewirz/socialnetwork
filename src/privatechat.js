import React from 'react';
import { connect } from 'react-redux';
import { ProfilePic } from './profilepic';
import { Link } from 'react-router-dom';
import { socket } from './socket';


export class PrivateChat extends React.Component {
    constructor() {
        super();
        this.state = {newMessage: ''};
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

    componentDidUpdate() {
        this.updateView();
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.submit);

    }

    submit(e) {
        if (e.type == "keydown" && e.keyCode === 13) {
            socket.emit("newPrivateMessage",{
                message: this.state.newMessage,
                targetId: this.props.match.params.id
            });
            this.setState({
                newMessage: ""
            });
        } else if (e.type != 'keydown') {
            socket.emit("newPrivateMessage",{
                message: this.state.newMessage,
                targetId: this.props.match.params.id
            });
            this.setState({
                newMessage: ""
            });
        }
    }

    handleChange(event) {
        this.setState({
            newMessage: event.target.value
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
                <input type="text" value={this.state.newMessage}  onChange={event => this.handleChange(event)} />
                <button type="submit" onClick={e => this.submit(e)}> Add Message </button>
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
