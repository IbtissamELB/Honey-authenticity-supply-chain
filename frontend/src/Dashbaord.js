import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';

function Dashboard() {
    const [productData, setProductData] = useState(null);
    const [productId, setProductId] = useState("");

    const fetchProductData = async () => {
        if (!productId) return;

        const provider = new ethers.JsonRpcProvider();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        const product = await contract.honeyProducts(productId);
        setProductData(product);
    };

    return (
        <div>
            <h2>Honey Dashboard</h2>
            <input
                type="text"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
            />
            <button onClick={fetchProductData}>Fetch Product</button>
            {productData && (
                <div>
                    <p>Producer: {productData.producer}</p>
                    <p>Origin: {productData.origin}</p>
                    <p>Certified: {productData.isCertified ? "Yes" : "No"}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
