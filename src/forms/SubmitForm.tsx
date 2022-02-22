import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { firestore } from "../libs/firebase";
import { addDoc, collection, FieldValue } from "firebase/firestore";
import RichTextEditor from "@mantine/rte";
import { Button, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";

const SubmitForm: React.FC = () => {
    const [encrypted, setEncrypted] = useState("");
    const [expire, setExpire] = useState(
        dayjs(new Date()).add(1, "hour").toDate()
    );
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
            expireAt: expire,
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
            <DatePicker
                placeholder="Pick Data"
                label="Expiration date"
                value={expire}
                onChange={(date) => setExpire(date ?? expire)}
                minDate={dayjs(new Date()).add(1, "hour").toDate()}
                maxDate={dayjs(new Date()).add(1, "month").toDate()}
                required
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
