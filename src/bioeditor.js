import React, { useState } from "react";
import axios from "./axios";
import { useEnter } from './hooks';

export function BioEditor(props) {
    const [bioLocal, setBioLocal] = useState("");
    const [bioVisible, setBioVisible] = useState(false);

    useEnter(submit);

    async function submit() {
        if (bioLocal == "" || bioLocal == undefined) {
            setBioLocal("");
            setBioVisible(false);
            return;
        }
        try {
            let resp = await axios.post("/addBio", {
                bio: bioLocal
            });
            if (resp.data.success) {
                setBioLocal("");
                setBioVisible(false);
                props.setBio(bioLocal);
            }
        } catch(err) {
            console.log("err in post /addBio", err);
        }
    }

    function openBioEditor() {
        setBioVisible(true);
    }

    function handleInput({ target} ) {
        setBioLocal(target.value);
    }

    async function deleteProfile() {
        let resp = await axios.post("/deleteProfile");
        if (resp.data.success == true) {
            location.replace("/welcome");
        }
    }

    return (
        <div>
            {props.bio && !bioVisible &&
                <div className="editBio">
                    {props.bio}
                    <button className="editButton" onClick={() => openBioEditor()}> Edit Bio </button>
                </div>
            }
            {!props.bio && !bioVisible &&
                <div className="addBio"> Add your Bio now!
                    <button className="addButton" onClick={() => openBioEditor()}> Add Bio </button>
                </div>
            }
            {bioVisible &&
                <div>
                    <p>Enter your bio here:</p>
                    <textarea className="textarea" defaultValue={props.bio} onChange={e => handleInput(e)}/>
                    <button className="saveButton" onClick={() => submit()}>Save</button>
                </div>
            }
            <button onClick={() => deleteProfile()}> Delete </button>
        </div>
    );
}
