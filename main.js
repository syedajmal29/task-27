const upiId = '8248438383@upi';
const name = 'Dhamodharan';
const amount = '1.00'; // amount in INR
const note = 'Payment for Order #123';
const currency = 'INR';

const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=${currency}&tn=${encodeURIComponent(note)}`;

console.log(upiUrl);
const QRCode = require('qrcode');

QRCode.toDataURL(upiUrl, function (err, url) {
  if (err) {
    console.error(err);
  } else {
    console.log(url); // This is the Base64 URL for the QR Code image
    document.getElementById('qrcode').src = url;
  }
});