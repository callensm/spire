import * as React from 'react'
import Card, { Meta } from '../Common/Card'
import Code from '../Common/Code'

interface IGistPreviewProps {
  gist: any
}

const GistPreview: React.SFC<IGistPreviewProps> = ({ gist }) => (
  <Card>
    <Meta title={gist.filename} description={gist.language} />
    <Code language={gist.language.toLowerCase()}>{gist.content}</Code>
  </Card>
)

export default GistPreview
