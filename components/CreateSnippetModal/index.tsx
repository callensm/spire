import * as React from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist } from 'react-syntax-highlighter/styles/hljs'
import StepTracker from './StepTracker'
import SourceCardList from './SourceCardList'
import SkeletonCards from './SkeletonCards'

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ModalContent = styled.div`
  margin-top: 2em;
`

const Code = styled(SyntaxHighlighter)`
  font-size: 0.75em;
`

interface ICreateSnippetModalProps {
  visible: boolean
  gists: any[]
  loading: boolean
  onClose: () => void
}

interface ICreateSnippetModalState {
  disableSubmit: boolean
  source: 'gist' | 'repo' | null
  currentStep: number
}

class CreateSnippetModal extends React.PureComponent<
  ICreateSnippetModalProps,
  ICreateSnippetModalState
> {
  state = {
    disableSubmit: true,
    source: null,
    currentStep: 0
  }

  componentDidUpdate() {
    console.log(this.props)
  }

  chooseSource = (source: 'gist' | 'repo') => {
    this.setState({ source, currentStep: 1 })
  }

  onCancel = () => {
    this.setState({ disableSubmit: true, source: null, currentStep: 0 })
    this.props.onClose()
  }

  render() {
    return (
      <Modal
        centered
        title="Create a New Snippet"
        visible={this.props.visible}
        okText="Create"
        cancelText="Discard"
        destroyOnClose={true}
        closable={false}
        onCancel={this.onCancel}
        onOk={() => alert('submit')}
        okButtonProps={{ disabled: this.state.disableSubmit }}
      >
        <ModalContainer>
          <StepTracker current={this.state.currentStep} />
          <ModalContent>
            {this.state.source && this.state.currentStep ? (
              this.state.source === 'gist' ? (
                <div>
                  {this.props.loading ? (
                    <SkeletonCards amount={this.props.gists.length} width="20em" />
                  ) : (
                    this.props.gists.map((g, i) => (
                      <div key={i}>
                        <Code showLineNumbers style={githubGist} lanugage="elixir">
                          {g.files['test.ex'].content}
                        </Code>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div />
              )
            ) : (
              <SourceCardList
                sources={[
                  {
                    id: 'gist',
                    title: 'Gist',
                    description: '(Only Gists with 1 file will be available)'
                  },
                  {
                    id: 'repo',
                    title: 'Repository',
                    description: '(Provide start and end lines for specific file)'
                  }
                ]}
                gutter={16}
                span={12}
                onSourceClick={this.chooseSource}
              />
            )}
          </ModalContent>
        </ModalContainer>
      </Modal>
    )
  }
}

export default CreateSnippetModal
