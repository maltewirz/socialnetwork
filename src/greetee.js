import React from 'react';

export function Greetee(props) {
    // we need a span because only one element can be reutrned
    const style = {
        color: "tomato"
    };
    return (

        <span className="ugly" style={style}>
            <em>{props.name || "World"}</em>
            {props.exclaim && `!!!`}
            {props.msg == 'Nice' ? <div>Nice!!</div> : <div>NotNice</div>}
            {/* This a JSX Comment*/}
        </span>
    );
};
