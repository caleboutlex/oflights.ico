import BigNumber from 'bignumber.js'

export const MAX_UINT= '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const formatter = new Intl.NumberFormat('en-US', 
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    );

export const makeContract = (library, abi, address) => {
  return new library.eth.Contract(abi, address);
}

const blocksPerYear = new BigNumber(10518975); 

const getPoolWeight = async (masterChefContract, pid) => {
    const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
    const totalAllocPoint = await masterChefContract.methods
      .totalAllocPoint()
      .call()
    return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getTotalLPValue = async (
    masterChefContract,
    wethContract,
    lpContract,
    tokenContract,
    pid,
    SUSHI_PER_BLOCK
  ) => {
    // Get balance of the token address
    const tokenAmountWholeLP = await tokenContract.methods
      .balanceOf(lpContract.options.address)
      .call()
    const tokenDecimals = await tokenContract.methods.decimals().call()
    // Get the share of lpContract that masterChefContract owns
    const balance = await lpContract.methods
      .balanceOf(masterChefContract.options.address)
      .call()
    // Convert that into the portion of total lpContract = p1
    const totalSupply = await lpContract.methods.totalSupply().call()
    // Get total weth value for the lpContract = w1
    const lpContractWeth = await wethContract.methods
      .balanceOf(lpContract.options.address)
      .call()
    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpWethWorth = new BigNumber(lpContractWeth)
    const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))
  
    const wethAmount = new BigNumber(lpContractWeth)
      .times(portionLp)
      .div(new BigNumber(10).pow(18))
    const poolWeight = await getPoolWeight(masterChefContract, pid);

    const _apr = wethAmount.div(tokenAmount)
        .times(SUSHI_PER_BLOCK)
        .times(blocksPerYear)
        .times(poolWeight)
        .div(totalLpWethValue.div(new BigNumber(10).pow(18)));

    return {
      tokenAmount: tokenAmount.toString(),
      wethAmount: wethAmount.toString(),
      totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)).toString(),
      tokenPriceInWeth: wethAmount.div(tokenAmount).toString(),
      poolWeight: poolWeight.toString(),
      apr: _apr.toString(),
    }
  }

