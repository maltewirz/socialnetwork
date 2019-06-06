import React from "react";

export function Profile({first, last, profilePic, bioEditor}) {
    return (
        <div>
            <div className="profileBox">
                <div> { profilePic }</div>
                <div className="profileBoxBio">
                    <div className="profileNameBox"> { first } { last }</div>
                    <div>{ bioEditor } </div>
                </div>
            </div>
        </div>
    );

}
