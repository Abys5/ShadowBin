import React from "react";
import "./styles/App.css";
import SubmitForm from "./forms/SubmitForm";
import GetForm from "./forms/GetForm";
import { AppShell, Container, Header, Tabs, Title } from "@mantine/core";

const App: React.FC = () => {
    return (
        <AppShell
            header={
                <Header height={50}>
                    <Title align="center" m={0} order={1}>
                        Shade Bin
                    </Title>
                </Header>
            }
        >
            <Container>
                <Tabs position="center">
                    <Tabs.Tab label="Store Message">
                        <SubmitForm />
                    </Tabs.Tab>
                    <Tabs.Tab label="Get Message">
                        <GetForm />
                    </Tabs.Tab>
                </Tabs>
            </Container>
        </AppShell>
    );
};

export default App;
