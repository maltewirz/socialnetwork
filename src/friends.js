import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import { getFriendsWannabes } from './actions';


export function Friends(props) {  // not sure if props correct here
    console.log("props in here", props.friendsWannabes);

    useEffect(() => {
        props.dispatch(getFriendsWannabes());
    }, []);

    return(
        <div>
            Hello World
        </div>
    );
}

const mapStateToProps = state => {
    return {
        friendsWannabes: state.listFriendsWannabes
    };
};

export default connect(mapStateToProps)(Friends);
