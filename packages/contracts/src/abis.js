import erc20Abi from "./abis/erc20.json";
import icoAbi from "../build/contracts/ICO.json";
import masterchefAbi from "../build/contracts/MasterChef.json";

const abis = {
  erc20: erc20Abi,
  ico: icoAbi.abi,
  masterchef: masterchefAbi.abi
};

export default abis;
