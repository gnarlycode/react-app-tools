export const createServerEntry: (
  cb: (
    args: {
      assets: any
      next: any
      req: any
      res: any
      scripts: string[]
      stats: any
    },
  ) => void,
) => any
