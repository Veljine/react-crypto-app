import React from 'react';
import {CryptoContextProvider} from "./Context/crypto-context.jsx";
import AppLayout from "./Components/AppLayout.jsx";

export default function App() {

    return (
        <CryptoContextProvider>
            <AppLayout />
        </CryptoContextProvider>
    );
};