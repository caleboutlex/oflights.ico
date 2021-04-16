import erc20Abi from "./abis/erc20.json";
import icoAbi from "../build/contracts/ICO.json";
import farmAbi from "../build/contracts/OFlightsFarm.json";
import factoryAbi from "./abis/factory.json";

const abis = {
  erc20: erc20Abi,
  ico: icoAbi.abi,
  farm: farmAbi.abi, 
  factory: factoryAbi
};

export default abis;
