import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Wallet Address
        <input
          placeholder="Type an address"
          value={address}
          onChange={onChange}
        ></input>
      </label>
      <div className="balance">Balance: {balance}</div>
      <div className="exampleWallets">
        <ul>
          <h2>Test Wallets</h2>
          <li>
            <b>Private Key:&nbsp;&nbsp;</b>
            1fa94b2db4b34041a56105fb482505e598f7a5e615a2c3bb8ea80fa3039eaadf
          </li>
          <li>
            <b>Public Address:&nbsp;</b> 0x4c708cd478ee0081ad696e568d5ca42a4f0f2157e4fba3efbc83767385156b37
          </li>
        </ul>
        <ul>
          <li>
            <b>Private Key:&nbsp;&nbsp;</b>
            761a5b49890e4b5956707265fea92e59725a91149cd86cbc477996c8298e4f7c
          </li>
          <li>
            <b>Public Address:&nbsp;</b> 0xd548b9af67342d52a532feb5662ffeb1d479ff1c2072fb60a24f451da2942251
          </li>
        </ul>
        <ul>
          <li>
            <b>Private Key:&nbsp;&nbsp;</b>
            24bb02f23ef6c49405aea87db13c2c09f8f176f31bd40a2d4d65a87be0a74408
          </li>
          <li>
            <b>Public Address:&nbsp;</b> 0xb30ce7b2ac4c98974695197c09f907450d3e20fba81c2b3f8c4877d779e9e643
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Wallet;
