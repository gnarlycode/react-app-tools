const toArr = x => (Array.isArray(x) ? x : [x])

module.exports = allstats => {
  const stats = allstats.clientStats ? allstats.clientStats : allstats
  // Prepare Assets
  let assets = [
    ...toArr(stats.assetsByChunkName.vendor),
    ...toArr(stats.assetsByChunkName.main),
  ]
  assets = assets.map(asset => `/${asset}`)
  if (process.env.BASE_URL) assets = assets.map(s => process.env.BASE_URL + s)
  let scripts = assets.filter(asset => /\.js$/.test(asset))

  return {
    assets,
    scripts,
    stats,
  }
}
