import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'

const POLLING_INTERVAL = 12000;

const RPC_URL_97="https://data-seed-prebsc-1-s1.binance.org:8545"
const RPC_URL_56="https://bsc-dataseed1.binance.org"

const RPC_URLS_ = [
  RPC_URL_97 ,
  RPC_URL_56 
]

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 250, 97, 56, 1337] })

export const network = new NetworkConnector({
  urls: { 56: RPC_URL_56, 97: RPC_URL_97 },
  defaultChainId: 1
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 56: RPC_URL_56 },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})

export const walletlink = new WalletLinkConnector({
  url: RPC_URL_56,
  appName: 'web3-react example'
})

export const ledger = new LedgerConnector({ chainId: 56, url: RPC_URL_56, pollingInterval: POLLING_INTERVAL })
