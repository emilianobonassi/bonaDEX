/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const UNISWAP_V2_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'

export const ETH_PRICE = `query bundles {
      bundles(where: { id: 1 }) {
        id
        ethPrice
      }
    }
  `

export const PRICES_BY_BLOCK = (tokenAddress, blocks) => {
  let queryString = 'query blocks {'
  queryString += blocks.map(
    (block) => `
      t${block.timestamp}:token(id:"${tokenAddress}", block: { number: ${block.number} }) { 
        derivedETH
      }
    `,
  )
  queryString += ','
  queryString += blocks.map(
    (block) => `
      b${block.timestamp}: bundle(id:"1", block: { number: ${block.number} }) { 
        ethPrice
      }
    `,
  )

  queryString += '}'
  return queryString
}
