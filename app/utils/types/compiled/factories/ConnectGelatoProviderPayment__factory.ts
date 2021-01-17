/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import { Contract, ContractFactory, Overrides } from '@ethersproject/contracts'

import type { ConnectGelatoProviderPayment } from '../ConnectGelatoProviderPayment'

export class ConnectGelatoProviderPayment__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(id: BigNumberish, _gelatoProvider: string, overrides?: Overrides): Promise<ConnectGelatoProviderPayment> {
    return super.deploy(id, _gelatoProvider, overrides || {}) as Promise<ConnectGelatoProviderPayment>
  }
  getDeployTransaction(id: BigNumberish, _gelatoProvider: string, overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(id, _gelatoProvider, overrides || {})
  }
  attach(address: string): ConnectGelatoProviderPayment {
    return super.attach(address) as ConnectGelatoProviderPayment
  }
  connect(signer: Signer): ConnectGelatoProviderPayment__factory {
    return super.connect(signer) as ConnectGelatoProviderPayment__factory
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ConnectGelatoProviderPayment {
    return new Contract(address, _abi, signerOrProvider) as ConnectGelatoProviderPayment
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_gelatoProvider',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'GELATO_CORE',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'connectorID',
    outputs: [
      {
        internalType: 'uint256',
        name: '_type',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gelatoProvider',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_getId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_setId',
        type: 'uint256',
      },
    ],
    name: 'payProvider',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_gelatoProvider',
        type: 'address',
      },
    ],
    name: 'setProvider',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const _bytecode =
  '0x60c060405234801561001057600080fd5b506040516113bc3803806113bc8339818101604052604081101561003357600080fd5b508051602090910151600080546001600160a01b03191633178082556040516001600160a01b039190911691907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3806001600160a01b0381166100cb5760405162461bcd60e51b815260040180806020018281038252603281526020018061138a6032913960400191505060405180910390fd5b50608082905230606081901b60a052600180546001600160a01b0319166001600160a01b0390931692909217909155611273610117600039806103135250806107a352506112736000f3fe6080604052600436106100b15760003560e01c80638f32d59b11610069578063cfd8d6c01161004e578063cfd8d6c01461022d578063eb15f7811461026d578063f2fde38b1461029b576100b1565b80638f32d59b146101ef578063bdde7cb714610218576100b1565b80636d7765e41161009a5780636d7765e41461017e578063715018a6146101c55780638da5cb5b146101da576100b1565b806306fdde03146100b65780631d8ca21414610140575b600080fd5b3480156100c257600080fd5b506100cb6102db565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101055781810151838201526020016100ed565b50505050905090810190601f1680156101325780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561014c57600080fd5b506101556102f7565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6101c36004803603608081101561019457600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020810135906040810135906060013561030f565b005b3480156101d157600080fd5b506101c361053d565b3480156101e657600080fd5b5061015561061f565b3480156101fb57600080fd5b5061020461063c565b604080519115158252519081900360200190f35b34801561022457600080fd5b5061015561065a565b34801561023957600080fd5b506101c36004803603602081101561025057600080fd5b503573ffffffffffffffffffffffffffffffffffffffff16610676565b34801561027957600080fd5b5061028261079e565b6040805192835260208301919091528051918290030190f35b3480156102a757600080fd5b506101c3600480360360208110156102be57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166107c5565b6040518060600160405280602181526020016111c16021913981565b731d681d76ce96e4d70a88a00ebbcfc1e47808d0b881565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663bdde7cb76040518163ffffffff1660e01b815260040160206040518083038186803b15801561037757600080fd5b505afa15801561038b573d6000803e3d6000fd5b505050506040513d60208110156103a157600080fd5b5051905060006103b18486610844565b90506103bd83826108ed565b73ffffffffffffffffffffffffffffffffffffffff861673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee141561051457731d681d76ce96e4d70a88a00ebbcfc1e47808d0b873ffffffffffffffffffffffffffffffffffffffff166328d0cad782846040518363ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1681526020019150506000604051808303818588803b15801561046c57600080fd5b505af19350505050801561047e575060015b61050f5761048a61101e565b8061049557506104be565b6104b860405180606001604052806036815260200161112660369139829061097e565b5061050f565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603f815260200180611182603f913960400191505060405180910390fd5b610535565b61053573ffffffffffffffffffffffffffffffffffffffff87168383610b5d565b505050505050565b61054561063c565b6105b057604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055565b60005473ffffffffffffffffffffffffffffffffffffffff165b90565b60005473ffffffffffffffffffffffffffffffffffffffff16331490565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b61067e61063c565b6106e957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b8073ffffffffffffffffffffffffffffffffffffffff8116610756576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252603281526020018061120c6032913960400191505060405180910390fd5b50600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6001907f000000000000000000000000000000000000000000000000000000000000000090565b6107cd61063c565b61083857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61084181610bef565b50565b600082156108e457738a5419cfc711b2343c17a6abf4b2bafabb06957f73ffffffffffffffffffffffffffffffffffffffff1663a9c70eaa846040518263ffffffff1660e01b815260040180828152602001915050602060405180830381600087803b1580156108b357600080fd5b505af11580156108c7573d6000803e3d6000fd5b505050506040513d60208110156108dd57600080fd5b50516108e6565b815b9392505050565b811561097a57604080517f61e3c94400000000000000000000000000000000000000000000000000000000815260048101849052602481018390529051738a5419cfc711b2343c17a6abf4b2bafabb06957f916361e3c94491604480830192600092919082900301818387803b15801561096657600080fd5b505af1158015610535573d6000803e3d6000fd5b5050565b80826040516020018083805190602001908083835b602083106109d057805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101610993565b51815160209384036101000a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018019909216911617905285519190930192850191508083835b60208310610a5457805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101610a17565b51815160209384036101000a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018019909216911617905260408051929094018281037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0018352938490527f08c379a00000000000000000000000000000000000000000000000000000000084526004840181815282516024860152825192975095508594506044909301928601915080838360005b83811015610b22578181015183820152602001610b0a565b50505050905090810190601f168015610b4f5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b6040805173ffffffffffffffffffffffffffffffffffffffff8416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb00000000000000000000000000000000000000000000000000000000179052610bea908490610ce8565b505050565b73ffffffffffffffffffffffffffffffffffffffff8116610c5b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806111006026913960400191505060405180910390fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6060610d4a826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610dc09092919063ffffffff16565b805190915015610bea57808060200190516020811015610d6957600080fd5b5051610bea576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a8152602001806111e2602a913960400191505060405180910390fd5b6060610dcf8484600085610dd7565b949350505050565b606082471015610e32576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602681526020018061115c6026913960400191505060405180910390fd5b610e3b85610f92565b610ea657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b600060608673ffffffffffffffffffffffffffffffffffffffff1685876040518082805190602001908083835b60208310610f1057805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101610ed3565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114610f72576040519150601f19603f3d011682016040523d82523d6000602084013e610f77565b606091505b5091509150610f87828286610f98565b979650505050505050565b3b151590565b60608315610fa75750816108e6565b825115610fb75782518084602001fd5b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201818152845160248401528451859391928392604401919085019080838360008315610b22578181015183820152602001610b0a565b60e01c90565b600060443d101561102e57610639565b600481823e6308c379a06110428251611018565b1461104c57610639565b6040517ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3d016004823e80513d67ffffffffffffffff816024840111818411171561109a5750505050610639565b828401925082519150808211156110b45750505050610639565b503d830160208284010111156110cc57505050610639565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01681016020016040529150509056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373436f6e6e65637447656c61746f50726f76696465725061796d656e742e70617950726f76696465722e70726f7669646546756e64733a416464726573733a20696e73756666696369656e742062616c616e636520666f722063616c6c436f6e6e65637447656c61746f50726f76696465725061796d656e742e70617950726f76696465722e70726f7669646546756e64733a756e646566696e6564436f6e6e65637447656c61746f50726f76696465725061796d656e742d76312e305361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564436f6e6e65637447656c61746f50726f76696465725061796d656e742e6e6f416464726573735a65726f50726f7669646572a2646970667358221220f1fe16fbdd11ec316456e8eae0afa2e32b5ce7c58f440312a30a8a89c14aa9a564736f6c63430007040033436f6e6e65637447656c61746f50726f76696465725061796d656e742e6e6f416464726573735a65726f50726f7669646572'
