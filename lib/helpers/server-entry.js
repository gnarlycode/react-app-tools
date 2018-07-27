const toArr = x => (Array.isArray(x) ? x : [x])
module.exports = cb => allstats => (req, res, next) => {
  const stats = allstats.clientStats ? allstats.clientStats : allstats
  // Prepare Assets
  let assets = [
    ...toArr(stats.assetsByChunkName.vendor),
    ...toArr(stats.assetsByChunkName.main),
  ]
  assets = assets.map(asset => `/${asset}`)
  let scripts = assets.filter(asset => /\.js$/.test(asset))
  if (process.env.BASE_URL) scripts = scripts.map(s => process.env.BASE_URL + s)
  const cbArgs = {
    assets,
    next,
    req,
    res,
    scripts,
    stats,
  }
  return cb(cbArgs)
}
