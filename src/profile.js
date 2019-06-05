import React from "react";

export function Profile({first, last, profilePic, bioEditor}) {
    return (
        <div>
            { profilePic }
            <div className="profileBox">
                { profilePic }
                { first } { last }
                { bioEditor }
            </div>
        </div>
    );

}
