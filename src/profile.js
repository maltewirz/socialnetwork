import React from "react";

export function Profile({logo, first, last, profilePic, bioEditor}) {
    return (
        <div>
            <div className="header">
                { logo }
                { profilePic }
            </div>
            <div className="profileBox">
                { profilePic }
                { first } { last }
                { bioEditor }
            </div>
        </div>
    );

}
