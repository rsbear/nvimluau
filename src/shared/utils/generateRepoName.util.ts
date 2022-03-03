interface IGenerateRepoName {
  owner: string
  repo: string
  fullName: string
}

export function generateRepoName(url: string): IGenerateRepoName | void {
  if (!url) return

  const splitInputUrl = url.split('.com')[1]
  const values = splitInputUrl.split('/')

  return {
    owner: values[1],
    repo: values[2],
    fullName: splitInputUrl.substring(1),
  }
}
