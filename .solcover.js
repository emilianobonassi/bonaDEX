module.exports = {
  skipFiles: ['__mocks__'],
  // https://github.com/trufflesuite/ganache-core#options
  providerOptions: {
    _chainId: 1337, // To equal "_chainIdRpc", which defaults to 1337
  },
}
