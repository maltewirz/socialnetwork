import React from 'react';
import {ColorBox} from "./colorbox";
import {Greetee} from "./greetee";

export class Hello extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            name: "Kitty"
        };
    }
    render() {
        return(
            <h1>
                Hello,
                <ColorBox color="aqua">
                    <Greetee name={this.state.name} exclaim={false} />
                </ColorBox>
                <div>
                    <input onChange={e => {
                        this.setState({
                            name: e.target.value
                        })
                    }} />
                </div>
            </h1>
        );
    }
}
