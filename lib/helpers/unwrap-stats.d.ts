declare const unwrapStats: <S>(
  stats: S,
) => {
  assets: any
  scripts: string[]
  styles: string[]
  stats: any
}

export = unwrapStats
