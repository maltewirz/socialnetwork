import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import { getFriendsWannabes } from './actions';
import { ProfilePic } from './profilepic';


export function Friends(props) {  // not sure if props correct here

    useEffect(() => {
        props.dispatch(getFriendsWannabes());
    }, []);
    console.log(props.friends);

    if (!props.friends) {
        return <div> Loading </div>;
    }

    return(
        <div>
            <h1> Friendslist </h1>
            {props.friends.length && props.friends.map(person => {
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
                            <div className="profileNameBox">
                                { person.first } { person.last }
                            </div>
                        </div>
                    </div>
                );
            })}
            <h1> Wannabes List </h1>
            {props.wannabes.length && props.wannabes.map(person => {
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
                            <div className="profileNameBox">
                                { person.first } { person.last }
                            </div>
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
