import axios from 'axios'

interface IGistDetails {
  id: string
  numberofFiles: number
  files: {
    [name: string]: {
      filename: string
      language: string
      content: string
      size: number
    }
  }
  public: boolean
  html_url: string
}

class GitHubAPI {
  private static readonly root: string = 'https://api.github.com'
  private static readonly auth: string = `?client_id=${process.env.GITHUB_ID}&client_secret=${
    process.env.GITHUB_SECRET
  }`

  async getGistDetails(id: string): Promise<IGistDetails> {
    const { data } = await axios.get(this.route(`/gists/${id}`))
    return {
      id: data.id,
      numberofFiles: Object.keys(data.files).length,
      files: data.files,
      public: data.public,
      html_url: data.html_url
    } as IGistDetails
  }

  async getGistIDs(username: string): Promise<string[]> {
    const { data } = await axios.get(this.route(`/users/${username}/gists`))
    return data.map(item => item.id)
  }

  async getRepoFileContent(username: string, repo: string, path: string): Promise<string> {
    const { data } = await axios.get(this.route(`/repos/${username}/${repo}/contents/${path}`))
    return data.content
  }

  private route = (r: string): string => `${GitHubAPI.root}${r}${GitHubAPI.auth}`
}

export default new GitHubAPI()
