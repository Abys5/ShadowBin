import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { firestore } from "../libs/firebase";
import { addDoc, collection } from "firebase/firestore";
import RichTextEditor from "@mantine/rte";
import { Button, TextInput } from "@mantine/core";

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
            <TextInput
                label="Password / Encryption Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <RichTextEditor
                value={input}
                onChange={(value) => setInput(value ?? "")}
            />
            <br />
            <Button type="submit">Submit</Button>
            {id ? <p>Your ID is: {id}</p> : null}
        </form>
    );
};

export default SubmitForm;
