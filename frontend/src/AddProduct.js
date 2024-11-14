import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';

function AddProduct() {
    const [form, setForm] = useState({
        producer: "",
        origin: "",
        productionDate: "",
        qrHash: ""
    });

    const handleSubmit = async () => {
        if (!window.ethereum) {
            alert("Please install Metamask to interact with this application.");
            return;
        }

        // Demander à l'utilisateur de se connecter avec Metamask
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Utiliser le provider de Metamask et créer un signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Créer une instance du contrat avec le signer
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // Convertir la date de production en timestamp (en secondes)
        const productionDateTimestamp = Math.floor(new Date(form.productionDate).getTime() / 1000);

        // Convertir le qrHash en bytes32 (hashé avec keccak256)
        const qrHashBytes = ethers.keccak256(ethers.toUtf8Bytes(form.qrHash));

        // Envoie la transaction pour ajouter le produit
        try {
            await contract.addHoneyProduct(
                form.producer,
                form.origin,
                productionDateTimestamp,
                qrHashBytes
            );
            alert("Product added successfully!");
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Failed to add product. Error: " + error.message);
        }
    };

    return (
        <div>
            <h2>Add New Honey Product</h2>
            <input
                type="text"
                placeholder="Producer"
                onChange={(e) => setForm({ ...form, producer: e.target.value })}
            />
            <input
                type="text"
                placeholder="Origin"
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
            />
            <input
                type="date"
                onChange={(e) => setForm({ ...form, productionDate: e.target.value })}
            />
            <input
                type="text"
                placeholder="QR Hash"
                onChange={(e) => setForm({ ...form, qrHash: e.target.value })}
            />
            <button onClick={handleSubmit}>Add Product</button>
        </div>
    );
}

export default AddProduct;
