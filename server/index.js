const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "21d1e639afa0f2e7700401e43d9f1cde0138cdca1ef19dfa714f624e7425537f": 100, // justice
  "766f17ddcc75f8055e3da0fc5604b310e9c0fc5f4c5011f5224f29881cbb679f": 50, // amahla
  "2684b4803deea4f45eb456ff1a56fd7387848354d806a3d8e1b6c9a130b50676": 75, // miko
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

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
