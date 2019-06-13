import React from 'react';
import { connect } from 'react-redux';

import { getListOfAnimals } from './actions';

class CuteAnimals extends React.Component {

    componentDidMount() {
        //in function compoents: props.dispatch();
        this.props.dispatch(getListOfAnimals());
    }

    render() {

        console.log("this.props in cute Animals", this.props);

        if (!this.props.myAnimals) {
            return <div> Loading </div>;
        }

        return(
            <div>
                <h1> Redux Demo </h1>
                { this.props.myAnimals.length &&
                    this.props.myAnimals.map(anim => (
                        <div key = { anim }> {anim} </div>
                    ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("state in mapStateToProps", state);
    return {
        //we'lll come back to this once we have global state
        myAnimals: state.listAnimals
    };
};


export default connect(mapStateToProps)(CuteAnimals);
