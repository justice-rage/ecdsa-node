const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x4c708cd478ee0081ad696e568d5ca42a4f0f2157e4fba3efbc83767385156b37": 100, // justice
  "0xd548b9af67342d52a532feb5662ffeb1d479ff1c2072fb60a24f451da2942251": 50, // amahla
  "0xb30ce7b2ac4c98974695197c09f907450d3e20fba81c2b3f8c4877d779e9e643": 75, // miko
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  // TODO: Get a signature from the client side application
  // recover the public address from the signature

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
