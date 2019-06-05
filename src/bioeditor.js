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
        } catch(err) {
            console.log("err in post /addBio", err);
        }
    }

    render() {
        return (
            <div> Bio Information
                <textarea value={this.props.bio} onChange={e => this.handleInput(e)}/>
                <button type="submit" onClick={e => this.submit()}>SAVE</button>
            </div>
        );
    }
}
