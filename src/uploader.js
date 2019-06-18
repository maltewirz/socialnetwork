import React from "react";
import axios from "./axios";

export function Uploader(props) {

    async function handleInput({ target }) {
        var formData = new FormData();
        formData.append("file",target.files[0]); //formdata to wrap "file"
        try{
            let resp = await axios.post("/upload", formData);
            props.changeImage(resp.data.url);
        } catch(err) {
            console.log("err in axios post /upload", err);
        }
    }

    return (
        <div className="modalWrapper">
            <div className="modal">
                <p id="closeModal" onClick={() => props.closeModal()}> X </p>
                <p> Want to change your image? </p>
                <input type="file" id="file" name="file" accept="image/*" className="inputfield" onChange={e => handleInput(e)}/>
                <label htmlFor="file" className="button" >Upload</label>
            </div>
        </div>
    );
}
