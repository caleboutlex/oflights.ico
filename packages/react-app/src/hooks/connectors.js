import { InjectedConnector } from '@web3-react/injected-connector'
const POLLING_INTERVAL = 12000;

const RPC_URL_97="https://data-seed-prebsc-1-s1.binance.org:8545"
const RPC_URL_56="https://bsc-dataseed1.binance.org"

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 250, 97, 56, 1337] })

