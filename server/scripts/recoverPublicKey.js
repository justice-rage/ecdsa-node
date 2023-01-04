const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const messageHash = "";
const signature = "";
const recoveredPublicKey = recoverPublicKey(messageHash, signature, recoveryBit)

async function recoverPublicKey(messageHash, signature, recoveryBit) {
    return secp.recoverPublicKey(
        messageHash, 
        signature, 
        recoveryBit);
}