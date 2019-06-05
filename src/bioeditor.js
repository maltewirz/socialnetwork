import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleInput({ target} ) {
        this.setState({
            bio: target.value
        });
    }

    async submit() {
        try {
            let resp = await axios.post("/addBio", {
                bio: this.state.bio
            });
            console.log("resp in frontend",resp.data.success);
            if (resp.data.success) {
                console.log("close the editor here");
                this.props.setBio(this.state.bio)
            }
        } catch(err) {
            console.log("err in post /addBio", err);
        }
    }

    render() {
        return (
            <div> Bio Information

                {!this.props.bio &&
                    <div>
                        <textarea onChange={e => this.handleInput(e)}/>
                        <button type="submit" onClick={e => this.submit()}>SAVE</button>
                     </div>
                }
                {this.props.bio &&
                    <div>
                        {this.props.bio} 
                    </div>
                }

            </div>
        );
    }
}
