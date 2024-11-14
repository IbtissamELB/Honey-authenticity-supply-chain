require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const HoneyABI = require('./contracts/HoneyABI.json');
const config = require('./config/config');

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(config.PROVIDER_URL);
const contract = new ethers.Contract(config.CONTRACT_ADDRESS, HoneyABI, provider);

app.get('/api/honey/:qrHash', async (req, res) => {
    const qrHash = req.params.qrHash;
    try {
        const productId = await contract.qrHashToId(qrHash);
        const product = await contract.honeyProducts(productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
