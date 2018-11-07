import * as React from 'react'
import { Slider, Input, Icon } from 'antd'
import { SliderValue } from 'antd/lib/slider'
import DescriptionInput from './DescriptionInput'
import Code from '../Common/Code'
import GitHubAPI from '../../lib/githubApi'
import langs from '../../lib/languageData'
import { CreationStore } from '../../lib/creationStore'
import { observer } from 'mobx-react'

interface ICreationSettingsProps {
  username: string
  repoName: string
  gistCode?: string
  store: CreationStore
}

interface ICreationSettingsState {
  filePath: string
  fullCode: string
  lines: number
  sliderValue: SliderValue
}

const debounce = (fn, ms = 0) => {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

const fileRegex: RegExp = /\..{1,}$/

@observer
class CreationSettings extends React.Component<ICreationSettingsProps, ICreationSettingsState> {
  state = {
    filePath: '',
    fullCode: '',
    lines: 1,
    sliderValue: [1, 200] as [number, number]
  }

  componentDidMount() {
    if (this.props.gistCode)
      this.setState({
        fullCode: this.props.gistCode,
        lines: this.props.gistCode.split('\n').length
      })
  }

  setFullCode = debounce(async () => {
    const { username, repoName } = this.props
    const content = await GitHubAPI.getRepoFileContent(username, repoName, this.state.filePath)
    const ext = this.state.filePath.substr(this.state.filePath.lastIndexOf('.'))
    const lang = Object.values(langs).filter(ex => ex.extensions.includes(ext))[0] || null

    this.setState(
      {
        fullCode: content,
        lines: content.split('\n').length
      },
      () => {
        this.props.store.setCode(content)
        this.props.store.setLanguage(lang.codemirror_mode || lang.ace_mode || '')
      }
    )
  }, 250)

  normalize = (line: string, amt: number): string => {
    return line.replace(/\t/g, l => (amt ? (amt--, '') : l))
  }

  handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filePath: e.target.value })

    if (fileRegex.test(e.target.value)) {
      this.setFullCode()
    }
  }

  handleSliderChange = (value: SliderValue) => {
    this.setState({ sliderValue: value }, () => {
      this.handleLineNumberChange(this.state.sliderValue)
    })
  }

  handleLineNumberChange = async (value: SliderValue) => {
    const [start, end] = value as [number, number]
    const lines = this.state.fullCode.split('\n').slice(start - 1, end)
    const toRemove: number = lines[0].search(/[^\t]/g)
    const code: string = lines.map(line => this.normalize(line, toRemove)).join('\n')
    this.props.store.setCode(code)
  }

  render() {
    return (
      <div>
        {this.props.store.source === 'repo' && (
          <Input
            value={this.state.filePath}
            placeholder="path/to/file.x"
            onChange={this.handleFileChange}
            addonBefore="repositoryRoot/"
            suffix={<Icon type="file-text" />}
          />
        )}
        <Slider
          disabled={!fileRegex.test(this.state.filePath) && !this.props.gistCode}
          value={this.state.sliderValue}
          onChange={this.handleSliderChange}
          min={1}
          max={this.state.lines - 1}
          marks={
            this.state.fullCode !== ''
              ? {
                  0: 1,
                  [this.state.lines - 1]: this.state.lines - 1
                }
              : {}
          }
          range
        />
        <Code
          startingLineNumber={this.state.sliderValue[0]}
          language={this.props.store.language.toLowerCase()}
        >
          {this.props.store.code}
        </Code>
        <DescriptionInput
          value={this.props.store.description}
          onChange={this.props.store.setDescription}
        />
      </div>
    )
  }
}

export default CreationSettings
