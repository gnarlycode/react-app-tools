declare const unwrapStats: <S>(
  stats: S,
) => {
  assets: any
  scripts: string[]
  stats: any
}

export = unwrapStats
