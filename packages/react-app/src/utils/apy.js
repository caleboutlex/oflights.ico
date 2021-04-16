import BigNumber from 'bignumber.js'


/**
 * Get the APY value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new reward allocated to the pool for each new block
 * @returns Null if the APY is NaN or infinite.
 */
export const getPoolApy = (
  stakingTokenPrice,
  rewardTokenPrice,
  totalStaked,
  tokenPerBlock,
) => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param rewardPriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApy = (poolWeight, rewardPriceUsd, poolLiquidityUsd) => {
  const yearlyCakeRewardAllocation = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apy = yearlyCakeRewardAllocation.times(rewardPriceUsd).div(poolLiquidityUsd).times(100)
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber()
}

export default null