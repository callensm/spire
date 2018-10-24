import * as React from 'react'
import { Modal, Card, Skeleton, Steps, Icon } from 'antd'
import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist } from 'react-syntax-highlighter/styles/hljs'

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 3em;
`

const SourceChoiceCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #ff876c;
  background-color: white;

  width: 15em;
  height: 10em;
  margin: 0 1em;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;

  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease;
  }

  span:first-child {
    margin: 10px 0;
  }
`

const SourceCardMeta = styled.p`
  text-align: center;
  margin-top: 1em;
  font-size: 0.6em;
  font-style: italic;
  color: rgba(0, 0, 0, 0.2);
  margin: 0 7px;
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

class CreateSnippetModal extends React.Component<
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

  renderLoadingCards = (): React.ReactNode[] => {
    const cards = []
    for (let i = 0; i < this.props.gists.length; i++)
      cards.push(
        <Card style={{ width: '20em' }}>
          <Skeleton active />
        </Card>
      )
    return cards
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
          <Steps current={this.state.currentStep}>
            <Steps.Step key="source" title="Choose Source" icon={<Icon type="github" />} />
            <Steps.Step key="input" title="Paste URL" icon={<Icon type="link" />} />
          </Steps>
          <ModalContent>
            {this.state.source && this.state.currentStep ? (
              this.state.source === 'gist' ? (
                <div>
                  {this.props.loading
                    ? this.renderLoadingCards()
                    : this.props.gists.map((g, i) => (
                        <div key={i}>
                          <Code showLineNumbers style={githubGist} lanugage="elixir">
                            {g.files['test.ex'].content}
                          </Code>
                        </div>
                      ))}
                </div>
              ) : (
                <div />
              )
            ) : (
              <>
                <SourceChoiceCard onClick={() => this.chooseSource('gist')}>
                  <span>Gist</span>
                  <SourceCardMeta>(Only Gists with 1 file will be available)</SourceCardMeta>
                </SourceChoiceCard>
                <SourceChoiceCard onClick={() => this.chooseSource('repo')}>
                  <span>Repository</span>
                  <SourceCardMeta>(Provide start and end lines for specific file)</SourceCardMeta>
                </SourceChoiceCard>
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </Modal>
    )
  }
}

export default CreateSnippetModal
