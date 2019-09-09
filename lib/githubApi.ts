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

/**
 * @class GitHubAPI
 * @private @static @readonly @property {string} root
 * @private @static @readonly @property {string} auth
 */
class GitHubAPI {
  private static readonly root: string = 'https://api.github.com'
  private static readonly auth: string = `?client_id=${process.env.GITHUB_ID}&client_secret=${
    process.env.GITHUB_SECRET
  }`

  /**
   * @description Get all the gist IDs for the argued GitHub username
   * @param {string} username
   * @returns {Promise<string[]>}
   * @memberof GitHubAPI
   */
  async getGistIDs(username: string): Promise<string[]> {
    const { data } = await axios.get(this.route(`/users/${username}/gists`))
    return data.map(item => item.id)
  }

  /**
   * @description Get all the repositories for the argued GitHub username
   * @param {string} username
   * @returns {Promise<IRepoDetails[]>}
   * @memberof GitHubAPI
   */
  async getRepos(username: string): Promise<IRepoDetails[]> {
    const { data } = await axios.get(this.route(`/users/${username}/repos`))
    return data.map(
      item => ({ id: item.id, name: item.name, description: item.description } as IRepoDetails)
    )
  }

  /**
   * @description Get the detailed payload for the argued gist ID from GitHub
   * @param {string} id
   * @returns {Promise<IGistDetails>}
   * @memberof GitHubAPI
   */
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

  /**
   * @description Get the file contents from the argued file path of the argued user's
   * repository
   * @param {string} username
   * @param {string} repo
   * @param {string} path
   * @returns {Promise<string>}
   * @memberof GitHubAPI
   */
  async getRepoFileContent(username: string, repo: string, path: string): Promise<string | Error> {
    try {
      const { data } = await axios.get(this.route(`/repos/${username}/${repo}/contents/${path}`))
      return Buffer.from(data.content, 'base64').toString()
    } catch (err) {
      return err
    }
  }

  /**
   * @description Converts a GitHub API route to a fully qualified URL to request
   * @private
   * @param {string} r
   * @returns {string}
   * @memberof GitHubAPI
   */
  private route = (r: string): string => `${GitHubAPI.root}${r}${GitHubAPI.auth}`
}

export default new GitHubAPI()
