import * as React from 'react'
import { Button, Icon } from 'antd'
import Card, { Meta } from '../Common/Card'
import Code from '../Common/Code'

interface IGistPreviewProps {
  gist: any
  loading: boolean
  onSelect: (gist) => void
}

export const GistPreview: React.SFC<IGistPreviewProps> = ({ gist, loading, onSelect }) => (
  <Card loading={loading} style={{ marginBottom: '1em' }}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Meta title={gist.filename} description={gist.language} />
      <Button onClick={() => onSelect(gist)}>
        Select <Icon type="caret-right" />
      </Button>
    </div>
    <Code language={gist.language.toLowerCase()}>{gist.content}</Code>
  </Card>
)

interface IGistPreviewListProps {
  gists: any[]
  loading: boolean
  onSelect: (gist) => void
}

export const GistPreviewList: React.SFC<IGistPreviewListProps> = ({ gists, loading, onSelect }) => (
  <>
    {gists.map(g => (
      <GistPreview key={g.id} loading={loading} gist={g} onSelect={onSelect} />
    ))}
  </>
)
