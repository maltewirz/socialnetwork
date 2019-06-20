import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import { getFriendsWannabes, acceptFriend, endFriend } from './actions';
import { ProfilePic } from './profilepic';
import { Link } from 'react-router-dom';


export function Friends(props) {

    useEffect(() => {
        props.dispatch(getFriendsWannabes());
    }, []);

    if (!props.friends) {
        return <div> Loading </div>;
    }

    return(
        <div>
            <h1> Friends </h1>
            {props.friends.length == 0 && <div> No Friends yet! </div>}
            {props.friends && props.friends.map(person => {
                return (
                    <div className="profileBox" key={ person.pic_url }>
                        <div>
                            <ProfilePic
                                imageUrl={person.pic_url}
                                first={person.first}
                                last={person.last}
                            />
                        </div>
                        <div className="profileBoxBio">
                            <Link to={"/user/" + person.id}>
                                <div className="profileNameBox">
                                    { person.first } { person.last }
                                </div>
                            </Link>
                            <button onClick={
                                () => props.dispatch(endFriend(person.id))
                            }> End Friendship </button>
                            <Link to={"/privatechat/" + person.id}><button> Private Chat </button></Link>

                        </div>
                    </div>
                );
            })}
            <h1> Friend Requests </h1>
            {props.wannabes.length == 0 && <div> No Friend Requests yet! </div>}
            {props.wannabes && props.wannabes.map(person => {
                return (
                    <div className="profileBox" key={ person.pic_url }>
                        <div>
                            <ProfilePic
                                imageUrl={person.pic_url}
                                first={person.first}
                                last={person.last}
                            />
                        </div>
                        <div className="profileBoxBio">
                            <Link to={"/user/" + person.id}>
                                <div className="profileNameBox">
                                    { person.first } { person.last }
                                </div>
                            </Link>
                            <button onClick={
                                () => props.dispatch(acceptFriend(person.id))
                            }> Accept Friend Request </button>
                            <button onClick={
                                () => props.dispatch(endFriend(person.id))
                            }> Remove Friend Request </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        friends: state.listFriendsWannabes && state.listFriendsWannabes.filter(friend => friend.accepted),
        wannabes: state.listFriendsWannabes && state.listFriendsWannabes.filter(friend => !friend.accepted)

    };
};

export default connect(mapStateToProps)(Friends);
