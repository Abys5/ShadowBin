import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import CryptoJS from "crypto-js";
import { firestore } from "../libs/firebase";
import { doc, getDoc } from "firebase/firestore";

const GetForm: React.FC = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const [encrypted, setEncrypted] = useState("");
    const [decrypted, setDecrypted] = useState("");

    useEffect(() => {
        setDecrypted(
            CryptoJS.AES.decrypt(encrypted, password).toString(
                CryptoJS.enc.Utf8
            )
        );
    }, [encrypted, password]);

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const docRef = await getDoc(doc(firestore, "trash", id));

        if (docRef.exists()) {
            console.log(docRef.data());
            setEncrypted(docRef.data().content);
        }
    };

    return (
        <form onSubmit={onFormSubmit}>
            <label>ID</label>
            <br />
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <br />
            <label>Password</label>
            <br />
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
            <h2>Results: </h2>
            <MDEditor.Markdown source={decrypted ?? null} />
        </form>
    );
};

export default GetForm;
