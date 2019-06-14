import React from "react";
import axios from "./axios";


export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state= {};
    }

    async handleInput({ target }) {
        var formData = new FormData();
        formData.append("file",target.files[0]); //formdata to wrap "file"
        try{
            let resp = await axios.post("/upload", formData);
            this.props.changeImage(resp.data.url);
        } catch(err) {
            console.log("err in axios post /upload", err);
        }
    }

    render() {
        return (
            <div className="modalWrapper">
                <div className="modal">
                    <p id="closeModal" onClick={() => this.props.closeModal()}> X </p>
                    <p> Want to change your image? </p>
                    <input type="file" id="file" name="file" accept="image/*" className="inputfield" onChange={e => this.handleInput(e)}/>
                    <label htmlFor="file" className="button" >Upload</label>
                </div>
            </div>
        );
    }
}
