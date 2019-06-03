import React from "react";

import { Registration } from "./registration";
import { Login } from "./login";

export class Welcome extends React.Component {
    render() {
        return (
            <div>
                <Registration />
            </div>
        );
    }
}
