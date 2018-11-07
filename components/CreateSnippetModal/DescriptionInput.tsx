import * as React from 'react'
import { Input } from 'antd'
import { observer } from 'mobx-react'

interface IDescriptionInputProps {
  value: string
  onChange: (val: string) => void
}

const DescriptionInput: React.SFC<IDescriptionInputProps> = observer(props => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Input.TextArea
      autosize
      value={props.value}
      placeholder="Describe your new snippet..."
      maxLength={250}
      onChange={e => props.onChange(e.target.value)}
    />
    <div style={{ width: '100%' }}>
      <span style={{ float: 'right', color: 'rgba(0, 0, 0, 0.45)' }}>
        Characters Left (10 minimum): {250 - props.value.length}
      </span>
    </div>
  </div>
))

export default DescriptionInput
