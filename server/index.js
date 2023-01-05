const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const {toHex, utf8ToBytes} = require("ethereum-cryptography/utils");
const {keccak256} = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
    "0x4717d36ac94067dd722c7c9129f89ddf2f58076e3cf7da18161771d3325ee87f": 100,
    "0xcff5d9183cc8df11d83d0e205d0998485016c251b261a8c635b8dc50af72db0a": 75,
    "0x9c27ac0f223616fa705dbdedf7b5524a126273b674441b038e21672823028bf1": 50,
};

let address;

app.get("/balance/:address", (req, res) => {
    address = req.params.address;
    const balance = balances[address] || 0;
    res.send({balance});
});

app.post("/send", (req, res) => {
    if (address == undefined || address == null) {
        res.status(400).send({message: "No address provided, need to get balance first."});
    }
    const {recipient, amount, signature, recoveryBit, publicKey} = req.body;
    console.log("Sender : ", address);
    console.log("Recipient : ", recipient);
    console.log("Amount : ", amount);
    console.log("Signature : ", signature);
    console.log("Recovery Bit : ", recoveryBit);

    let message = {
        from: address,
        to: recipient,
        amount: amount,
    };
    const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));
    const recoverKey = secp.recoverPublicKey(messageHash, signature, recoveryBit);
    setInitialBalance(address);
    setInitialBalance(recipient);
    if (toHex(recoverKey) === publicKey) {
        if (balances[address] < amount) {
            res.status(400).send({message: "Not enough funds in " + address + " wallet."});
        } else {
            balances[address] -= amount;
            balances[recipient] += amount;
            res.send({balance: balances[address]});
        }
    } else {
        res.status(400).send({message: "Not the right signature."});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}