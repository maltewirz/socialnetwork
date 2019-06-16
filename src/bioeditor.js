import React, { useState } from "react";
import axios from "./axios";

export function BioEditor(props) {
    const [bioLocal, setBioLocal] = useState("");
    const [bioVisible, setBioVisible] = useState(false);
    console.log("bioLocal", bioLocal);
    console.log("bioVisible", bioVisible);

    async function submit() {
        console.log("bioLocal in submit", bioLocal);
        if (bioLocal == "" || bioLocal == undefined) {
            setBioLocal(null);
        }
        try {
            console.log("arriving here?");
            let resp = await axios.post("/addBio", {
                bio: bioLocal
            });
            if (resp.data.success) {

                console.log("am i runig?1");
                console.log("props here", props);
                props.setBio(bioLocal);

                console.log("am i runig?2");
                setBioLocal("");

                console.log("am i runig?3");
                setBioVisible(false);
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
                    <button className="saveButton" type="submit" onClick={() => submit()}>Save</button>
                </div>
            }
        </div>
    );
}
