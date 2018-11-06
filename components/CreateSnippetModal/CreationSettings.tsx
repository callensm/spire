import * as React from 'react'
import { Slider, Input, Icon } from 'antd'
import { SliderValue } from 'antd/lib/slider'
import DescriptionInput from './DescriptionInput'
import Code from '../Common/Code'
import GitHubAPI from '../../lib/githubApi'
import langs from '../../lib/languageData'

interface ICreationSettingsProps {
  source: 'gist' | 'repo'
  username: string
  repoName: string
  hasDescription: (b: boolean) => void
}

interface ICreationSettingsState {
  filePath: string
  selectedCode: string
  fullCode: string
  language: string
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

class CreationSettings extends React.Component<ICreationSettingsProps, ICreationSettingsState> {
  state = {
    filePath: '',
    selectedCode: '',
    fullCode: '',
    language: '',
    sliderValue: [1, 200] as [number, number]
  }

  setFullCode = debounce(async () => {
    const { username, repoName } = this.props
    const content = await GitHubAPI.getRepoFileContent(username, repoName, this.state.filePath)
    const ext = this.state.filePath.substr(this.state.filePath.lastIndexOf('.'))
    const lang = Object.values(langs).filter(ex => ex.extensions.includes(ext))[0] || null
    this.setState({
      fullCode: content,
      selectedCode: content,
      language: lang.codemirror_mode || lang.ace_mode || ''
    })
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
    this.setState({
      selectedCode: code
    })
  }

  render() {
    return (
      <div>
        {this.props.source === 'repo' ? (
          <>
            <Input
              value={this.state.filePath}
              placeholder="path/to/file.x"
              onChange={this.handleFileChange}
              addonBefore="repositoryRoot/"
              suffix={<Icon type="file-text" />}
            />
            <Slider
              disabled={!fileRegex.test(this.state.filePath)}
              value={this.state.sliderValue}
              onChange={this.handleSliderChange}
              min={1}
              max={this.state.fullCode.split('\n').length - 1}
              range
            />
            <Code
              startingLineNumber={this.state.sliderValue[0]}
              language={this.state.language.toLowerCase()}
            >
              {this.state.selectedCode}
            </Code>
          </>
        ) : (
          <span>test</span>
        )}
        <DescriptionInput hasDescription={this.props.hasDescription} />
      </div>
    )
  }
}

export default CreationSettings
