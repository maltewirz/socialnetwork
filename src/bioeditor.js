import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    async submit() {
        if (this.state.bio == "" || this.state.bio == undefined) {
            this.setState({
                bio: null
            })
        }
        try {
            let resp = await axios.post("/addBio", {
                bio: this.state.bio
            });
            if (resp.data.success) {
                this.props.setBio(this.state.bio)
                this.setState({
                    bioVisible: false,
                    bio: ""
                })

            }
        } catch(err) {
            console.log("err in post /addBio", err);
        }
    }

    openBioEditor() {
        this.setState({
            bioVisible: true
        })
    }

    handleInput({ target} ) {
        this.setState({
            bio: target.value
        });

    }

    render() {

        return (

            <div> Bio Information
                {this.props.bio && !this.state.bioVisible &&
                    <div>
                        {this.props.bio}
                        <button onClick={e => this.openBioEditor()}> Edit Bio </button>
                    </div>
                }
                {!this.props.bio && !this.state.bioVisible &&
                    <div> You have no Bio!
                        <button onClick={e => this.openBioEditor()}> Add Bio </button>
                    </div>
                }
                {this.state.bioVisible &&
                    <div>
                        <p>enter your bio here</p>
                        <textarea defaultValue={this.props.bio} onChange={e => this.handleInput(e)}/>
                        <button type="submit" onClick={e => this.submit()}>Save</button>
                     </div>
                }
            </div>
        );
    }
}
