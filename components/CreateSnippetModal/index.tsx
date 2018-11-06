import * as React from 'react'
import { Modal } from 'antd'
import styled from 'styled-components'
import GitHubAPI, { IRepoDetails, IGistDetails } from '../../lib/githubApi'
import StepTracker from './StepTracker'
import SourceCardList from './SourceCardList'
import SkeletonCards from './SkeletonCards'
import { GistPreviewList } from './GistPreview'
import { RepoPreviewList } from './RepoPreview'
import CreationSettings from './CreationSettings'

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ModalContent = styled.div`
  margin-top: 2em;
  width: 100%;
`

interface ICreateSnippetModalProps {
  visible: boolean
  username: string
  gistIDs: string[]
  repos: IRepoDetails[]
  onClose: () => void
}

interface ICreateSnippetModalState {
  disableSubmit: boolean
  source: 'gist' | 'repo' | null
  currentStep: number
  gists: any[]
  loading: boolean
  selected: any
}

class CreateSnippetModal extends React.PureComponent<
  ICreateSnippetModalProps,
  ICreateSnippetModalState
> {
  state = {
    disableSubmit: true,
    source: null,
    currentStep: 0,
    gists: [],
    loading: false,
    selected: null
  }

  chooseSource = async (source: 'gist' | 'repo') => {
    this.setState({ source, currentStep: 1, loading: true })
    const { gistIDs } = this.props

    if (source === 'gist') {
      const details: Promise<IGistDetails>[] = gistIDs.map(i => GitHubAPI.getGistDetails(i))
      const gists: IGistDetails[] = await Promise.all(details)
      const availableGists = gists
        .filter(g => Object.keys(g.files).length === 1)
        .map(g => ({ ...Object.values(g.files)[0], id: g.id }))
      this.setState({ gists: availableGists, loading: false })
    }
  }

  onCancel = () => {
    this.props.onClose()
    this.setState({ disableSubmit: true, source: null, currentStep: 0, loading: false, gists: [] })
  }

  handleSubmit = () => {
    alert('submit')
  }

  handleSelectGist = gist => {
    this.setState({ selected: gist, currentStep: 2 })
  }

  handleSelectRepo = repo => {
    this.setState({ selected: repo, currentStep: 2 })
  }

  enableSubmit = (b: boolean) => {
    this.setState({ disableSubmit: !b })
  }

  renderStep = (step: number): React.ReactNode => {
    switch (step) {
      case 0: {
        return (
          <SourceCardList
            sourceOptions={[
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
        )
      }

      case 1: {
        if (this.state.source === 'gist') {
          return this.state.loading ? (
            <SkeletonCards amount={this.props.gistIDs.length} width="35em" />
          ) : (
            <GistPreviewList
              gists={this.state.gists}
              loading={this.state.loading}
              onSelect={this.handleSelectGist}
            />
          )
        } else {
          return <RepoPreviewList repos={this.props.repos} onSelect={this.handleSelectRepo} />
        }
      }

      case 2: {
        return (
          <CreationSettings
            username={this.props.username}
            repoName={this.state.selected.name}
            source={this.state.source}
            gistCode={this.state.source === 'gist' ? this.state.gists[1].content : null}
            hasDescription={this.enableSubmit}
          />
        )
      }
    }
  }

  render() {
    return (
      <Modal
        title="Create a New Snippet"
        visible={this.props.visible}
        okText="Create"
        cancelText="Discard"
        destroyOnClose={true}
        closable={false}
        maskClosable={false}
        onCancel={this.onCancel}
        onOk={this.handleSubmit}
        okButtonProps={{ disabled: this.state.disableSubmit }}
      >
        <ModalContainer>
          <StepTracker current={this.state.currentStep} />
          <ModalContent>{this.renderStep(this.state.currentStep)}</ModalContent>
        </ModalContainer>
      </Modal>
    )
  }
}

export default CreateSnippetModal
