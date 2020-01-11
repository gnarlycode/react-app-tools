const toArr = x => (Array.isArray(x) ? x : [x])

module.exports = allstats => {
  const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : ''
  const stats = allstats.clientStats ? allstats.clientStats : allstats
  let assets = [
    ...toArr(stats.assetsByChunkName.vendor),
    ...toArr(stats.assetsByChunkName.main),
  ]
  assets = assets.map(a => `${baseUrl}/${a}`)
  const scripts = assets.filter(a => /\.js$/.test(a))
  const styles = assets.filter(a => /\.css$/.test(a))
  return {
    assets,
    scripts,
    styles,
    stats,
  }
}
