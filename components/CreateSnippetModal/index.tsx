import * as React from 'react'
import { Modal, notification } from 'antd'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import GitHubAPI, { IRepoDetails, IGistDetails } from '../../lib/githubApi'
import StepTracker from './StepTracker'
import SourceCardList from './SourceCardList'
import SkeletonCards from './SkeletonCards'
import { GistPreviewList } from './GistPreview'
import { RepoPreviewList } from './RepoPreview'
import CreationSettings from './CreationSettings'
import { CreationStore } from '../../lib/creationStore'

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
  store?: CreationStore
  onClose: () => void
}

interface ICreateSnippetModalState {
  currentStep: number
  gists: any[]
  loading: boolean
  selected: any
}

@inject('store')
@observer
class CreateSnippetModal extends React.Component<
  ICreateSnippetModalProps,
  ICreateSnippetModalState
> {
  state = {
    currentStep: 0,
    gists: [],
    loading: false,
    selected: null
  }

  chooseSource = async (source: 'gist' | 'repo') => {
    this.setState({ currentStep: 1 })
    this.props.store.setSource(source)

    const { gistIDs } = this.props
    if (source === 'gist') {
      this.setState({ loading: true })

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
    this.props.store.reset()
    this.setState({ currentStep: 0, loading: false, gists: [] })
  }

  handleSubmit = async () => {
    try {
      await axios.post('/api/snippet', {
        author: this.props.username,
        description: this.props.store.description,
        code: this.props.store.code,
        language: this.props.store.language,
        origin: this.props.store.origin
      })
      notification.success({
        message: 'New Snippet Created!',
        description: (
          <>
            <p style={{ marginBottom: 0, paddingBottom: 0 }}>
              <b>Origin:</b>{' '}
              <a href={this.props.store.origin} target="_blank">
                {this.props.store.source === 'gist' ? 'Gist' : 'Repository File'}
              </a>
            </p>
            <p>
              <b>Description:</b> {this.props.store.description}
            </p>
          </>
        )
      })
      this.props.store.reset()
      this.props.onClose()
    } catch (err) {
      console.error(err)
    }
  }

  handleSelectGist = gist => {
    this.setState({ selected: gist, currentStep: 2 })
  }

  handleSelectRepo = repo => {
    this.setState({ selected: repo, currentStep: 2 })
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
        if (this.props.store.source === 'gist') {
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
          // TODO: Fix gist source click event and data passing
          <CreationSettings
            username={this.props.username}
            name={
              this.props.store.source === 'gist'
                ? this.state.selected.filename
                : this.state.selected.name
            }
            gistID={this.props.store.source === 'gist' ? this.state.selected.id : null}
            gistCode={this.props.store.source === 'gist' ? this.state.selected.content : null}
            store={this.props.store}
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
        okButtonProps={{ disabled: this.props.store.description.length < 10 }}
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
