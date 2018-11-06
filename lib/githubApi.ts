import axios from 'axios'

export interface IGistDetails {
  id: string
  numberOfFiles: number
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

export interface IRepoDetails {
  id: number
  name: string
  description: string
}

class GitHubAPI {
  private static readonly root: string = 'https://api.github.com'
  private static readonly auth: string = `?client_id=${process.env.GITHUB_ID}&client_secret=${
    process.env.GITHUB_SECRET
  }`

  async getGistIDs(username: string): Promise<string[]> {
    const { data } = await axios.get(this.route(`/users/${username}/gists`))
    return data.map(item => item.id)
  }

  async getRepos(username: string): Promise<IRepoDetails[]> {
    const { data } = await axios.get(this.route(`/users/${username}/repos`))
    return data.map(
      item => ({ id: item.id, name: item.name, description: item.description } as IRepoDetails)
    )
  }

  async getGistDetails(id: string): Promise<IGistDetails> {
    const { data } = await axios.get(this.route(`/gists/${id}`))
    return {
      id: data.id,
      numberOfFiles: Object.keys(data.files).length,
      files: data.files,
      public: data.public,
      html_url: data.html_url
    } as IGistDetails
  }

  async getRepoFileContent(username: string, repo: string, path: string): Promise<string> {
    try {
      const { data } = await axios.get(this.route(`/repos/${username}/${repo}/contents/${path}`))
      return Buffer.from(data.content, 'base64').toString()
    } catch (err) {
      return err
    }
  }

  private route = (r: string): string => `${GitHubAPI.root}${r}${GitHubAPI.auth}`
}

export default new GitHubAPI()
