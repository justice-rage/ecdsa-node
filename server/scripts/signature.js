const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

async function signMessage(message, privateKey) {
    const signature = await secp.sign(messageHash, privateKey, { recovered: true });
    return signature;
}
