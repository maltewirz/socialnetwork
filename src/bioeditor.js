import React from "react";

export class BioEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div> Bio Information
                
                <input type="text" name="bioTextArea" />
                <button>SAVE</button>
            </div>
        );
    }
}


<div className="modalWrapper">
    <div className="modal">
        <p> Want to change your image? </p>
        <input type="file" id="file" name="file" accept="image/*" className="inputfield" onChange={e => this.handleInput(e)}/>
        <label htmlFor="file" className="button" >Upload</label>
    </div>
</div>
