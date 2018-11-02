import * as React from 'react'
import { Tag } from 'antd'
import axios from 'axios'

interface ITagAssignmentProps {
  initial: string[]
}

interface ITagAssignmentState {
  tagSource: string[]
  selected: string[]
}

class TagAssignment extends React.Component<ITagAssignmentProps, ITagAssignmentState> {
  state = {
    tagSource: [],
    selected: [...this.props.initial]
  }

  componentWillMount() {
    axios
      .get('/api/tag')
      .then(res => this.setState({ tagSource: res.data.map(t => t.text) }))
      .catch(console.error)
  }

  render() {
    return (
      <>
        <div>
          {this.state.selected.map((s, i) => (
            <Tag key={i} closable>
              {s}
            </Tag>
          ))}
        </div>
      </>
    )
  }
}

export default TagAssignment
