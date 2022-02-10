import React from "react";
import "./styles/App.css";
import SubmitForm from "./forms/SubmitForm";
import GetForm from "./forms/GetForm";

const App: React.FC = () => {
    return (
        <div className="container">
            <h1>Shade Bin</h1>
            <SubmitForm />
            <GetForm />
        </div>
    );
};

export default App;
