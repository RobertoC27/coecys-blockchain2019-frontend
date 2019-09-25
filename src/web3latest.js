const Web3 = require('web3');

let web3;
let defaultAccount;

const getWeb3 = async () => {

  if (window.ethereum) {
    // modern dapp browser
    console.log('🆕')
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    console.log(await web3.eth.getAccounts());

  } else if (window.web3) {
    // legacy dapp browser
    console.log('🗝️')
  } else {
    // no dapp browser
    console.log('❓')
    web3 = new Web3('ws://localhost:7545');
    let acc = await web3.eth.getAccounts();
    defaultAccount = acc[0]
  }
}

const newContract = async(account) => {
  let tmp =  new web3.eth.Contract(ABI, {data: bytecode}).deploy();
  console.log('⚖️',tmp)
  return tmp.send({from: account})
  
}

const getContract = async (address) => {
  let tmp =  new web3.eth.Contract(ABI, address, {data: bytecode});
  return tmp
  
}

const getAccount = async () => {
  let acc = await web3.eth.getAccounts();
  return acc;
}


const ABI =  [
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "prize",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "players",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "createdLottery",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "player",
        "type": "address"
      }
    ],
    "name": "playerEntered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "winningPlayer",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "enterLottery",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "pickWinner",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]

const bytecode = "0x608060405234801561001057600080fd5b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f7eceafa8e757b86a9fccffa3e3f1c9ac92b0bc5f320b9cc908fe0b5343052c5833604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1610643806100c46000396000f3fe60806040526004361061004a5760003560e01c80635d495aea1461004f5780638da5cb5b14610059578063c1af5785146100b0578063e3ac5d26146100ba578063f71d96cb146100e5575b600080fd5b610057610160565b005b34801561006557600080fd5b5061006e610353565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100b8610379565b005b3480156100c657600080fd5b506100cf6104c2565b6040518082815260200191505060405180910390f35b3480156100f157600080fd5b5061011e6004803603602081101561010857600080fd5b81019080803590602001909291905050506104c8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610223576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f6f6e6c79206f776e65722063616e207069636b2077696e6e657200000000000081525060200191505060405180910390fd5b6000600180549050610233610504565b8161023a57fe5b0690506001818154811061024a57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f193505050501580156102d1573d6000803e3d6000fd5b5060006040519080825280602002602001820160405280156103025781602001602082028038833980820191505090505b506001908051906020019061031892919061054a565b507f17435129a9c8984fef17f33be4867e674df721173c929cc65166f4e0a60b09ab816040518082815260200191505060405180910390a150565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b670de0b6b3a76400003410156103f7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f6174206c656173742031206574686572206d7573742062652073656e7400000081525060200191505060405180910390fd5b60013390806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550507f0d68fbe0bedd0f8f60a7d5e5e96fb664767e5b35946d5769b688671b4ed9c22a33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1565b60005481565b600181815481106104d557fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600042600180549050446040516020018084815260200183815260200182815260200193505050506040516020818303038152906040528051906020012060001c905090565b8280548282559060005260206000209081019282156105c3579160200282015b828111156105c25782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019061056a565b5b5090506105d091906105d4565b5090565b61061491905b8082111561061057600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506001016105da565b5090565b9056fea165627a7a7230582079a7d279bdd29c54879f78e87d75ed1ee7c0de34d56a36deae455c79bb68976c0029"
getWeb3()
export default web3;
export { getContract, getAccount, newContract };