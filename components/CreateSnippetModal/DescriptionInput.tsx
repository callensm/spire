import * as React from 'react'
import { Input } from 'antd'

interface IDescriptionInputProps {
  onHasContent: () => void
}

interface IDescriptionInputState {
  value: string
}

class DescriptionInput extends React.PureComponent<IDescriptionInputProps, IDescriptionInputState> {
  state = {
    value: ''
  }

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ value: e.target.value })
    if (this.state.value.length > 10) this.props.onHasContent()
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Input.TextArea
          autosize
          value={this.state.value}
          placeholder="Describe your new snippet..."
          maxLength={250}
          onChange={this.handleChange}
        />
        <div style={{ width: '100%' }}>
          <span style={{ float: 'right', color: 'rgba(0, 0, 0, 0.45)' }}>
            Characters Left: {250 - this.state.value.length}
          </span>
        </div>
      </div>
    )
  }
}

export default DescriptionInput
