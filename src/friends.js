import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import { getFriendsWannabes } from './actions';


export function Friends(props) {  // not sure if props correct here

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
    return {};
};

export default connect(mapStateToProps)(Friends);
