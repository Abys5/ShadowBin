import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { firestore } from "../libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import RichTextEditor from "@mantine/rte";
import { Button, TextInput } from "@mantine/core";

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
            <TextInput
                label={"ID"}
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <TextInput
                label="Password / Encryption Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button type="submit">Submit</Button>
            <h2>Results: </h2>
            <RichTextEditor value={decrypted} onChange={() => {}} readOnly />
        </form>
    );
};

export default GetForm;
