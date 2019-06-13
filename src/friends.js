import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import { getFriendsWannabes } from './actions';
import { ProfilePic } from './profilepic';


export function Friends(props) {  // not sure if props correct here

    useEffect(() => {
        props.dispatch(getFriendsWannabes());
    }, []);

    if (!props.friendsWannabes) {
        return <div> Loading </div>;
    }

    return(
        <div>
            {props.friendsWannabes.length && props.friendsWannabes.map(person => {
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
        friendsWannabes: state.listFriendsWannabes
    };
};

export default connect(mapStateToProps)(Friends);
