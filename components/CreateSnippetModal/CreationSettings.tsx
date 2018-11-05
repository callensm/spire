import * as React from 'react'
import { Slider, Input, Icon } from 'antd'
import { SliderValue } from 'antd/lib/slider'
import DescriptionInput from './DescriptionInput'
import Code from '../Common/Code'
import GitHubAPI from '../../lib/githubApi'

interface ICreationSettingsProps {
  source: 'gist' | 'repo'
  username: string
  repoName: string
  onHasContent: () => void
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
    sliderValue: [0, 200] as [number, number]
  }

  setFullCode = debounce(async () => {
    const { username, repoName } = this.props
    const content = await GitHubAPI.getRepoFileContent(username, repoName, this.state.filePath)
    this.setState({ fullCode: content, selectedCode: content })
  }, 500)

  normalize = (lines: string[]) => {
    const toRemove: number = lines[0].search(/[^\t]/g)
    return lines.map(line => line.slice(toRemove))
  }

  handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filePath: e.target.value })

    if (fileRegex.test(e.target.value)) {
      this.setFullCode()
    }
  }

  handleSliderChange = (value: SliderValue) => {
    this.setState({ sliderValue: value })
  }

  handleLineNumberChange = async (value: SliderValue) => {
    const [start, end] = value as [number, number]
    this.setState({
      selectedCode: this.normalize(this.state.fullCode.split('\n').slice(start - 1, end + 1)).join(
        '\n'
      )
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
              onAfterChange={this.handleLineNumberChange}
              min={0}
              max={this.state.fullCode.split('\n').length}
              range
            />
            <Code language="javascript">{this.state.selectedCode}</Code>
          </>
        ) : (
          <span>test</span>
        )}
        <DescriptionInput onHasContent={this.props.onHasContent} />
      </div>
    )
  }
}

export default CreationSettings
