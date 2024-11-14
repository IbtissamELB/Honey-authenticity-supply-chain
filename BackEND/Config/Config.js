require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

module.exports = {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS, // Adresse du contrat déployé sur Ganache
    PROVIDER_URL: process.env.PROVIDER_URL // URL du réseau Ganache
};
