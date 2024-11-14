import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

function QRScanner({ onVerify }) {
    const [qrCode, setQrCode] = useState("");

    const handleScan = (data) => {
        if (data) {
            setQrCode(data);
            onVerify(data);
        }
    };

    return (
        <div>
            <h2>Scan QR Code</h2>
            <QrReader
                onResult={(result) => result && handleScan(result.text)}
                style={{ width: '100%' }}
            />
            <p>Scanned QR Code: {qrCode}</p>
        </div>
    );
}

export default QRScanner;
