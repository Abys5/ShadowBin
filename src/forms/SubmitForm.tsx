import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import CryptoJS from "crypto-js";
import { firestore } from "../libs/firebase";
import { addDoc, collection } from "firebase/firestore";

const SubmitForm: React.FC = () => {
    const [encrypted, setEncrypted] = useState("");
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        setEncrypted(CryptoJS.AES.encrypt(input, password).toString());
    }, [input, password]);

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const docRef = await addDoc(collection(firestore, "trash"), {
            content: encrypted,
        });

        setId(docRef.id);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <label>Password</label>
            <br />
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <MDEditor
                value={input}
                onChange={(value) => setInput(value ?? "")}
            />
            <button type="submit">Submit</button>
            {id ? <p>Your ID is: {id}</p> : null}
        </form>
    );
};

export default SubmitForm;
