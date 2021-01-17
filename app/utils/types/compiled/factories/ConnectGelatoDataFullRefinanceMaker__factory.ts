/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import { Contract, ContractFactory, Overrides } from '@ethersproject/contracts'

import type { ConnectGelatoDataFullRefinanceMaker } from '../ConnectGelatoDataFullRefinanceMaker'

export class ConnectGelatoDataFullRefinanceMaker__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(
    id: BigNumberish,
    connectGelatoProviderPayment: string,
    overrides?: Overrides,
  ): Promise<ConnectGelatoDataFullRefinanceMaker> {
    return super.deploy(
      id,
      connectGelatoProviderPayment,
      overrides || {},
    ) as Promise<ConnectGelatoDataFullRefinanceMaker>
  }
  getDeployTransaction(
    id: BigNumberish,
    connectGelatoProviderPayment: string,
    overrides?: Overrides,
  ): TransactionRequest {
    return super.getDeployTransaction(id, connectGelatoProviderPayment, overrides || {})
  }
  attach(address: string): ConnectGelatoDataFullRefinanceMaker {
    return super.attach(address) as ConnectGelatoDataFullRefinanceMaker
  }
  connect(signer: Signer): ConnectGelatoDataFullRefinanceMaker__factory {
    return super.connect(signer) as ConnectGelatoDataFullRefinanceMaker__factory
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ConnectGelatoDataFullRefinanceMaker {
    return new Contract(address, _abi, signerOrProvider) as ConnectGelatoDataFullRefinanceMaker
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
        name: 'connectGelatoProviderPayment',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
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
    inputs: [
      {
        internalType: 'uint256',
        name: '_vaultId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_colToken',
        type: 'address',
      },
    ],
    name: 'getDataAndCastMakerToCompound',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_vaultAId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_vaultBId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_colToken',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_colType',
        type: 'string',
      },
    ],
    name: 'getDataAndCastMakerToMaker',
    outputs: [],
    stateMutability: 'payable',
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
]

const _bytecode =
  '0x60c06040523480156200001157600080fd5b5060405162002c9438038062002c94833981016040819052620000349162000050565b60809190915260601b6001600160601b03191660a0526200008d565b6000806040838503121562000063578182fd5b825160208401519092506001600160a01b038116811462000082578182fd5b809150509250929050565b60805160a05160601c612bd6620000be6000398061070452806111e252806115fa5250806101235250612bd66000f3fe60806040526004361061003f5760003560e01c806306fdde031461004457806345c4b9b51461006f578063e588576e14610084578063eb15f78114610097575b600080fd5b34801561005057600080fd5b506100596100ba565b6040516100669190612a47565b60405180910390f35b61008261007d3660046127ae565b6100d6565b005b610082610092366004612783565b6100fd565b3480156100a357600080fd5b506100ac61011e565b604051610066929190612b14565b604051806060016040528060288152602001612b4f6028913981565b6060806100e68787878787610145565b915091506100f48282610378565b50505050505050565b60608061010a8484610493565b915091506101188282610378565b50505050565b6001907f000000000000000000000000000000000000000000000000000000000000000090565b60408051600180825281830190925260609182919060208083019080368337019050509150733150e5a805577366816a1ddc7330c6ea17070c058260008151811061018c57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505060006101d96101d489610a54565b610d38565b905060006101e689610d54565b90506000610208736b175474e89094c44da98b954eedeac495271d0f84610e9c565b905060006102178a1583610fe1565b9050600061022482611037565b90506060808c156102425761023d8e8e8e8a8a8861104a565b610251565b6102518e8d8d8d8b8b89611405565b604080516001808252818301909252929450909250816020015b606081526020019060019003908161026b579050509750638d0a9b1b60e01b736b175474e89094c44da98b954eedeac495271d0f888785856040516020016102b49291906129cd565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290526102f294939291602401612988565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050508860008151811061035c57fe5b6020026020010181905250505050505050509550959350505050565b606063e0e90acf60e01b838333604051602401610397939291906129fb565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050509050600060603073ffffffffffffffffffffffffffffffffffffffff168360405161041f919061294b565b600060405180830381855af49150503d806000811461045a576040519150601f19603f3d011682016040523d82523d6000602084013e61045f565b606091505b50915091508161048c5761048c6040518060600160405280602a8152602001612b77602a9139829061186f565b5050505050565b60408051600180825281830190925260609182919060208083019080368337019050509150733150e5a805577366816a1ddc7330c6ea17070c05826000815181106104da57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505060006105226101d486610a54565b9050600061052f86610d54565b90506000610551736b175474e89094c44da98b954eedeac495271d0f84610e9c565b9050600061055e82611d3f565b9050600061056b82611037565b60408051600680825260e08201909252919250606091906020820160c08036833701905050905073ac02030d8a8f49ed04b2f52c394d3f901a10f8a9816000815181106105b457fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073ac02030d8a8f49ed04b2f52c394d3f901a10f8a98160018151811061061057fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250507307f81230d73a78f63f0c2a3403ad281b067d28f88160028151811061066c57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250507307f81230d73a78f63f0c2a3403ad281b067d28f8816003815181106106c857fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250507f00000000000000000000000000000000000000000000000000000000000000008160048151811061073057fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050733150e5a805577366816a1ddc7330c6ea17070c058160058151811061078c57fe5b73ffffffffffffffffffffffffffffffffffffffff929092166020928302919091019091015260408051600680825260e08201909252606091816020015b60608152602001906001900390816107ca5790505090506108108b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6000610258611d68565b8160008151811061081d57fe5b60200260200101819052506108558b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600080611deb565b8160018151811061086257fe5b60200260200101819052506108838a61087b8886611e6e565b600080611ee0565b8160028151811061089057fe5b60200260200101819052506108bf736b175474e89094c44da98b954eedeac495271d0f60006102586000611f78565b816003815181106108cc57fe5b60200260200101819052506108e48a84600080612010565b816004815181106108f157fe5b602002602001018190525061091d736b175474e89094c44da98b954eedeac495271d0f886000806120a8565b8160058151811061092a57fe5b602090810291909101015260408051600180825281830190925290816020015b606081526020019060019003908161094a579050509750638d0a9b1b60e01b736b175474e89094c44da98b954eedeac495271d0f888785856040516020016109939291906129cd565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290526109d194939291602401612988565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505088600081518110610a3b57fe5b6020026020010181905250505050505050509250929050565b6000735ef30b9986345249bc32d8928b7ee64de9435e398180610a778386612140565b9150915060008373ffffffffffffffffffffffffffffffffffffffff166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b158015610ac357600080fd5b505afa158015610ad7573d6000803e3d6000fd5b505050506040513d6020811015610aed57600080fd5b5051604080517fd9638d3600000000000000000000000000000000000000000000000000000000815260048101869052905191925060009173ffffffffffffffffffffffffffffffffffffffff84169163d9638d369160248083019260a0929190829003018186803b158015610b6257600080fd5b505afa158015610b76573d6000803e3d6000fd5b505050506040513d60a0811015610b8c57600080fd5b5060200151604080517f2424be5c0000000000000000000000000000000000000000000000000000000081526004810187905273ffffffffffffffffffffffffffffffffffffffff8681166024830152825193945060009390861692632424be5c9260448082019391829003018186803b158015610c0957600080fd5b505afa158015610c1d573d6000803e3d6000fd5b505050506040513d6040811015610c3357600080fd5b50602090810151604080517f6c25b34600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8881166004830152915192945060009391871692636c25b34692602480840193919291829003018186803b158015610cad57600080fd5b505afa158015610cc1573d6000803e3d6000fd5b505050506040513d6020811015610cd757600080fd5b505190506000610cf0610cea8486612268565b83611e6e565b90506b033b2e3c9fd0803ce80000008104985080610d1a8a6b033b2e3c9fd0803ce8000000612268565b10610d255788610d2a565b886001015b9a9950505050505050505050565b6000610d4c82670df27a2cdf4480006122ee565b90505b919050565b600080735ef30b9986345249bc32d8928b7ee64de9435e39905060008173ffffffffffffffffffffffffffffffffffffffff166336569e776040518163ffffffff1660e01b815260040160206040518083038186803b158015610db657600080fd5b505afa158015610dca573d6000803e3d6000fd5b505050506040513d6020811015610de057600080fd5b50519050600080610df18487612140565b9150915060008373ffffffffffffffffffffffffffffffffffffffff16632424be5c84846040518363ffffffff1660e01b8152600401808381526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050604080518083038186803b158015610e6557600080fd5b505afa158015610e79573d6000803e3d6000fd5b505050506040513d6040811015610e8f57600080fd5b5051979650505050505050565b6000610ea66126ba565b6040517f5a860c8700000000000000000000000000000000000000000000000000000000815273a004a5afba04b74037e9e52ba1f7eb02b5e6150990635a860c8790610ef6908790600401612967565b60806040518083038186803b158015610f0e57600080fd5b505afa158015610f22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f469190612724565b90508281600001511115610f5e576000915050610fdb565b8281602001511115610f74576001915050610fdb565b8281604001511115610f8a576002915050610fdb565b8281606001511115610fa0576003915050610fdb565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fd290612ab7565b60405180910390fd5b92915050565b6000610fec82612323565b8261100e57610ff9612361565b826004811061100457fe5b6020020151611030565b611030611019612361565b836004811061102457fe5b6020020151600061239b565b9392505050565b6000610d4c8261104561240d565b612268565b60408051600680825260e082019092526060918291906020820160c08036833701905050915073ac02030d8a8f49ed04b2f52c394d3f901a10f8a98260008151811061109257fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073ac02030d8a8f49ed04b2f52c394d3f901a10f8a9826001815181106110ee57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073ac02030d8a8f49ed04b2f52c394d3f901a10f8a98260028151811061114a57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073ac02030d8a8f49ed04b2f52c394d3f901a10f8a9826003815181106111a657fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250507f00000000000000000000000000000000000000000000000000000000000000008260048151811061120e57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050733150e5a805577366816a1ddc7330c6ea17070c058260058151811061126a57fe5b73ffffffffffffffffffffffffffffffffffffffff9290921660209283029190910182015260408051600680825260e082019092529182015b60608152602001906001900390816112a35790505090506112e9887fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6000610258611d68565b816000815181106112f657fe5b602002602001018190525061132e887fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600080611deb565b8160018151811061133b57fe5b602002602001018190525061135c876113548686611e6e565b60008061249a565b8160028151811061136957fe5b6020026020010181905250611384876000610258600061251d565b8160038151811061139157fe5b60200260200101819052506113a98684600080612010565b816004815181106113b657fe5b60200260200101819052506113e2736b175474e89094c44da98b954eedeac495271d0f866000806120a8565b816005815181106113ef57fe5b6020026020010181905250965096945050505050565b60408051600780825261010082019092526060918291906020820160e08036833701905050915073ac02030d8a8f49ed04b2f52c394d3f901a10f8a98260008151811061144e57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073ac02030d8a8f49ed04b2f52c394d3f901a10f8a9826001815181106114aa57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073ac02030d8a8f49ed04b2f52c394d3f901a10f8a98260028151811061150657fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073ac02030d8a8f49ed04b2f52c394d3f901a10f8a98260038151811061156257fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073ac02030d8a8f49ed04b2f52c394d3f901a10f8a9826004815181106115be57fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250507f00000000000000000000000000000000000000000000000000000000000000008260058151811061162657fe5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050733150e5a805577366816a1ddc7330c6ea17070c058260068151811061168257fe5b73ffffffffffffffffffffffffffffffffffffffff9290921660209283029190910182015260408051600780825261010082019092529182015b60608152602001906001900390816116bc579050509050611702897fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6000610258611d68565b8160008151811061170f57fe5b6020026020010181905250611747897fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600080611deb565b8160018151811061175457fe5b602002602001018190525061179e87878080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506125a092505050565b816002815181106117ab57fe5b60200260200101819052506117c560006113548686611e6e565b816003815181106117d257fe5b60200260200101819052506117ed600080610258600061251d565b816004815181106117fa57fe5b60200260200101819052506118128884600080612010565b8160058151811061181f57fe5b602002602001018190525061184b736b175474e89094c44da98b954eedeac495271d0f866000806120a8565b8160068151811061185857fe5b602002602001018190525097509795505050505050565b602082518161187a57fe5b0660041415611bfb5760208201517f08c379a0000000000000000000000000000000000000000000000000000000007fffffffff0000000000000000000000000000000000000000000000000000000082161415611ab75760448301925081836040516020018083805190602001908083835b6020831061192a57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe090920191602091820191016118ed565b51815160209384036101000a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018019909216911617905285519190930192850191508083835b602083106119ae57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101611971565b51815160209384036101000a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff018019909216911617905260408051929094018281037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0018352938490527f08c379a00000000000000000000000000000000000000000000000000000000084526004840181815282516024860152825192975095508594506044909301928601915080838360005b83811015611a7c578181015183820152602001611a64565b50505050905090810190601f168015611aa95780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b816040516020018082805190602001908083835b60208310611b0857805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101611acb565b5181517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60209485036101000a0190811690199091161790527f4e6f4572726f7253656c6563746f72000000000000000000000000000000000093909101928352604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffef818603018152600f8501918290527f08c379a000000000000000000000000000000000000000000000000000000000909152601384018281528151603386015281519196509450849360530192509085019080838360008315611a7c578181015183820152602001611a64565b806040516020018082805190602001908083835b60208310611c4c57805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09092019160209182019101611c0f565b5181517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60209485036101000a0190811690199091161790527f556e657870656374656452657475726e6461746100000000000000000000000093909101928352604080517ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff481860301815260148501918290527f08c379a000000000000000000000000000000000000000000000000000000000909152601884018281528151603886015281519196509450849360580192509085019080838360008315611a7c578181015183820152602001611a64565b6000611d4a82612323565b611d52612361565b8260048110611d5d57fe5b602002015192915050565b6040805160248101869052604481018590526064810184905260848082018490528251808303909101815260a49091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fd5e0da3600000000000000000000000000000000000000000000000000000000179052949350505050565b6040805160248101869052604481018590526064810184905260848082018490528251808303909101815260a49091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f674fb1b400000000000000000000000000000000000000000000000000000000179052949350505050565b80820382811115610fdb57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f64732d6d6174682d7375622d756e646572666c6f770000000000000000000000604482015290519081900360640190fd5b6040805173ffffffffffffffffffffffffffffffffffffffff86166024820152604481018590526064810184905260848082018490528251808303909101815260a49091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fce88b43900000000000000000000000000000000000000000000000000000000179052949350505050565b6040805173ffffffffffffffffffffffffffffffffffffffff86166024820152604481018590526064810184905260848082018490528251808303909101815260a49091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f38baa4c200000000000000000000000000000000000000000000000000000000179052949350505050565b6040805173ffffffffffffffffffffffffffffffffffffffff86166024820152604481018590526064810184905260848082018490528251808303909101815260a49091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f6d7765e400000000000000000000000000000000000000000000000000000000179052949350505050565b6040805173ffffffffffffffffffffffffffffffffffffffff86166024820152604481018590526064810184905260848082018490528251808303909101815260a49091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f213980e800000000000000000000000000000000000000000000000000000000179052949350505050565b6000808373ffffffffffffffffffffffffffffffffffffffff16632c2cb9fd846040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b15801561219457600080fd5b505afa1580156121a8573d6000803e3d6000fd5b505050506040513d60208110156121be57600080fd5b5051604080517f2726b07300000000000000000000000000000000000000000000000000000000815260048101869052905191935073ffffffffffffffffffffffffffffffffffffffff861691632726b07391602480820192602092909190829003018186803b15801561223157600080fd5b505afa158015612245573d6000803e3d6000fd5b505050506040513d602081101561225b57600080fd5b5051919491935090915050565b60008115806122835750508082028282828161228057fe5b04145b610fdb57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6d756c2d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b6000670de0b6b3a76400006123146123068585612268565b6706f05b59d3b2000061239b565b8161231b57fe5b049392505050565b600481111561235e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fd290612a5a565b50565b6123696126e2565b604051806080016040528062266fd88152602001622feb948152602001623c97b8815260200162424ca8815250905090565b80820182811015610fdb57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b600073169e633a2d1e6c10dd91238ba11c4a708dfef37c73ffffffffffffffffffffffffffffffffffffffff166350d25bcd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561246957600080fd5b505afa15801561247d573d6000803e3d6000fd5b505050506040513d602081101561249357600080fd5b5051905090565b6040805160248101869052604481018590526064810184905260848082018490528251808303909101815260a49091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f2505c3d900000000000000000000000000000000000000000000000000000000179052949350505050565b6040805160248101869052604481018590526064810184905260848082018490528251808303909101815260a49091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f111d948200000000000000000000000000000000000000000000000000000000179052949350505050565b6040516020602482018181528351604484015283516060937fe4dcb06b000000000000000000000000000000000000000000000000000000009386939283926064019185019080838360005b838110156126045781810151838201526020016125ec565b50505050905090810190601f1680156126315780820380516001836020036101000a031916815260200191505b50604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090961695909517909452509192505050919050565b6040518060800160405280600081526020016000815260200160008152602001600081525090565b60405180608001604052806004906020820280368337509192915050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610d4f57600080fd5b600060808284031215612735578081fd5b6040516080810181811067ffffffffffffffff8211171561275257fe5b8060405250825181526020830151602082015260408301516040820152606083015160608201528091505092915050565b60008060408385031215612795578081fd5b823591506127a560208401612700565b90509250929050565b6000806000806000608086880312156127c5578081fd5b85359450602086013593506127dc60408701612700565b9250606086013567ffffffffffffffff808211156127f8578283fd5b818801915088601f83011261280b578283fd5b813581811115612819578384fd5b89602082850101111561282a578384fd5b9699959850939650602001949392505050565b6000815180845260208085019450808401835b8381101561288257815173ffffffffffffffffffffffffffffffffffffffff1687529582019590820190600101612850565b509495945050505050565b60008282518085526020808601955080818302840101818601855b848110156128f4577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08684030189526128e2838351612901565b988401989250908301906001016128a8565b5090979650505050505050565b60008151808452612919816020860160208601612b22565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6000825161295d818460208701612b22565b9190910192915050565b73ffffffffffffffffffffffffffffffffffffffff91909116815260200190565b600073ffffffffffffffffffffffffffffffffffffffff86168252846020830152836040830152608060608301526129c36080830184612901565b9695505050505050565b6000604082526129e0604083018561283d565b82810360208401526129f2818561288d565b95945050505050565b600060608252612a0e606083018661283d565b8281036020840152612a20818661288d565b91505073ffffffffffffffffffffffffffffffffffffffff83166040830152949350505050565b6000602082526110306020830184612901565b6020808252603e908201527f4647656c61746f446562744272696467652e5f676574476173436f73744d616b60408201527f6572546f4d616b65723a20696e76616c696420726f75746520696e6465780000606082015260800190565b6020808252602e908201527f4647656c61746f446562744272696467652e5f676574466c6173684c6f616e5260408201527f6f7574653a20696c6c6971756964000000000000000000000000000000000000606082015260800190565b918252602082015260400190565b60005b83811015612b3d578181015183820152602001612b25565b83811115610118575050600091015256fe436f6e6e65637447656c61746f4461746146756c6c526566696e616e63654d616b65722d76312e30436f6e6e65637447656c61746f4461746146756c6c526566696e616e63654d616b65722e5f636173743aa2646970667358221220c18a07a30ca274716690b111282f4931de3127842932e50a42aaae75047de87b64736f6c63430007040033'
