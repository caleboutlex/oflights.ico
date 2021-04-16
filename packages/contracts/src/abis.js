import erc20Abi from "./abis/erc20.json";
import icoAbi from "./abis/ICO.json";
import farmAbi from "./abis/OFlightsFarm.json";
import factoryAbi from "./abis/factory.json";
import oflyAbi from './abis/OFlightsToken.json'

const abis = {
  erc20: erc20Abi,
  ico: icoAbi.abi,
  ofly: oflyAbi.abi,
  farm: farmAbi.abi, 
  factory: factoryAbi
};

export default abis;
