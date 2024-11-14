import React, { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import QRScanner from './components/QRScanner';
import Search from './components/Search';
import './App.css';

function App() {
    const [userType, setUserType] = useState(null);

    const handleLogin = (type) => {
        setUserType(type);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Honey Authenticity</h1>
            </header>
            <main>
                {!userType ? (
                    <Auth onLogin={handleLogin} />
                ) : (
                    <>
                        <Dashboard />
                        {userType === "producer" && <AddProduct />}
                        {userType === "consumer" && <QRScanner />}
                        <Search />
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
