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
            this.props.changeImage(resp.data.url);
        })
    }

    render() {
        return (
            <div>
                <input type="file" id="file" name="file" accept="image/*" className="inputfield" onChange={e => this.handleInput(e)}/>
                <label for="file" >Upload</label>
            </div>
        );
    }
}

{/*

    ////////

    constructor(props) {
        super(props);
        this.state = {};
        this.url = url;
    }

    handleInput({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }


    <p class="uploadArea">
        <input type="file" id="file" name="file" accept="image/*" @change='handleFileChange' class="inputfile">
        <label for="file" class="inputfileEX">file</label>
        <button @click.prevent.default="uploadFile" class="bubble-format">upload</button>
    </p>

    */}
