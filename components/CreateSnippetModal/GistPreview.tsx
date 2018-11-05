import * as React from 'react'
import { Button, Icon, Tag } from 'antd'
import colors from '../../lib/languageColors'
import Card, { Meta } from '../Common/Card'
import Code from '../Common/Code'

interface IGistPreviewProps {
  fileName: string
  language: string
  content: string
  loading: boolean
  onSelect: () => void
}

export const GistPreview: React.SFC<IGistPreviewProps> = props => (
  <Card loading={props.loading} style={{ marginBottom: '1em' }}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Meta
        title={props.fileName}
        description={<Tag color={colors[props.language].color}>{props.language}</Tag>}
      />
      <Button onClick={props.onSelect}>
        Select <Icon type="caret-right" />
      </Button>
    </div>
    <Code language={props.language.toLowerCase()}>{props.content}</Code>
  </Card>
)

interface IGistPreviewListProps {
  gists: any[]
  loading: boolean
  onSelect: (gist) => void
}

export const GistPreviewList: React.SFC<IGistPreviewListProps> = ({ gists, loading, onSelect }) => (
  <>
    <h3>Available Gists</h3>
    {gists.map(g => (
      <GistPreview
        key={g.id}
        fileName={g.filename}
        language={g.language}
        content={g.content}
        loading={loading}
        onSelect={() => onSelect(g)}
      />
    ))}
  </>
)
