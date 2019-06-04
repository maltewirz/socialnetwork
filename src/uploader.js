import React from "react"
import axios from "./axios";


export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state= {};
    }

    handleInput({ target }) {
        var formData = new FormData();
        formData.append("file",target.files[0]) //formdata needed to wrap "file"
        axios.post("/upload", formData).then(resp => {
            this.setState({
                url: resp.data.url
            });
            console.log(this.props);
            this.props.changeImage(resp.data.url);
        })
    }

    render() {
        return (
            <div className="modalWrapper">
                <div className="modal">
                    <p> Want to change your image? </p>
                    <input type="file" id="file" name="file" accept="image/*" className="inputfield" onChange={e => this.handleInput(e)}/>
                    <label htmlFor="file" className="button" >Upload</label>
                </div>
            </div>
        );
    }
}
