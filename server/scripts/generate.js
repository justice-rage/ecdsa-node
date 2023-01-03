const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);
const address = toHex(getAddress(publicKey));

function getAddress(PublicKey) {
    return keccak256(publicKey.slice(1).slice(-20));
}


console.log(`Private Key: ${toHex(privateKey)}`);
console.log(`Public Key: ${toHex(publicKey)}`);
console.log(`Address: ${address}`);