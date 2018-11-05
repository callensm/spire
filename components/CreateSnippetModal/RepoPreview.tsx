import * as React from 'react'
import { Button, Icon } from 'antd'
import Card, { Meta } from '../Common/Card'
import { IRepoDetails } from '../../lib/githubApi'

interface IRepoPreviewProps {
  name: string
  description: string
  onSelect: () => void
}

export const RepoPreview: React.SFC<IRepoPreviewProps> = ({ name, description, onSelect }) => (
  <Card style={{ marginBottom: '1em' }}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Meta title={name} description={description || ' '} />
      <Button onClick={onSelect}>
        Select <Icon type="caret-right" />
      </Button>
    </div>
  </Card>
)

interface IRepoPreviewListProps {
  repos: IRepoDetails[]
  onSelect: (repo: IRepoDetails) => void
}

export const RepoPreviewList: React.SFC<IRepoPreviewListProps> = ({ repos, onSelect }) => (
  <>
    <h3>Available Repositories</h3>
    {repos.map(r => (
      <RepoPreview
        key={r.id}
        name={r.name}
        description={r.description}
        onSelect={() => onSelect(r)}
      />
    ))}
  </>
)
