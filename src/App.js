import React, { Component } from 'react';
import './App.css';
import web3, { getContract, getAccount, newContract } from './web3latest';

class App extends Component {
  state = { defaultAccount: 'loading...', accounts: null, amount: '', funds: null, owner: '' };
  contract = null;

  async componentDidMount() {
    if (typeof (web3) != undefined) {
      let acc = await getAccount()
      let addrMetamask = '0x0656B46f00eD871AC84e90Cd837CE1CdAAedFDCd';
      let addrTruffle = '0xF517cF2Ffd8C462E8b0CC4B41Dd3De7703EdE422'
      this.contract = await getContract(addrTruffle);
      let owner = await this.contract.methods.owner().call();
      console.log(owner)
      this.setState({ defaultAccount: acc[0], accounts: acc, owner })
      this.contract.events.playerEntered()
        .on('data', event => {
          console.log(event)
        })
    } else {
      console.log('mal');
      this.setState({ defaultAccount: 'There was an error with web3' })
    }

  }

  handler = async (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  enter = async (e) => {
    let t = await this.contract.methods.enterLottery().send({
      from: this.state.defaultAccount,
      value: web3.utils.toWei(this.state.amount, 'ether')
    })
    this.setState({ amount: '' })

    let addr = await this.contract.methods.players(0).call();
    console.log(addr)
  }

  pickWinner = async () => {
    await this.contract.methods.pickWinner().send({ from: this.state.defaultAccount });
  }

  render() {
    let select, pickWinner = null
    if (this.state.accounts) {

      let options = this.state.accounts.map(account =>
        <option value={account} key={account}>{account}</option>
      )
      select =
        <div className="form-group col-3">
          <h2>Cuentas disponibles</h2>
          <select className="form-control" name="defaultAccount" id="" value={this.state.defaultAccount} onChange={this.handler}>
            {options}
          </select>
        </div>
    }
    if (this.state.owner === this.state.defaultAccount) {
      pickWinner = <button onClick={this.pickWinner}>Pick Winner</button>
    }
    return (
      <div className="container p-2">

        <div>
          <div className="h1">My ethereum addres is:</div>
          <div className="h3 primary"> {this.state.defaultAccount}</div>
        </div>
        <div id="owner">{this.state.lotteryOwner}</div>
        {select}
        <div className="form-row col-6 mt-2">
          <div className="col-6">
            <input className="form-control" type="text" name="amount" value={this.state.amount} onChange={this.handler} />
          </div>
          <label htmlFor="">ether</label>
          <div>

          <button onClick={this.enter}>Entrar</button>
          </div>
        </div>
        <div className="container">
          {pickWinner}
        </div>
      </div>
    );
  }
}

export default App;
