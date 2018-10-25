import * as React from 'react'
import { Row, Col } from 'antd'
import { Card, Meta } from '../common'

interface ISourceCardProps {
  title: string
  description: string
  span: number
  onClick: () => void
}

const SourceCard: React.SFC<ISourceCardProps> = props => (
  <Col span={props.span}>
    <Card onClick={props.onClick}>
      <Meta title={props.title} description={props.description} />
    </Card>
  </Col>
)

interface ISourceCardListProps {
  gutter: number
  span: number
  sources: {
    id: string
    title: string
    description: string
  }[]
  onSourceClick: (src: string) => void
}

const SourceCardList: React.SFC<ISourceCardListProps> = props => (
  <Row type="flex" justify="center" gutter={props.gutter}>
    {props.sources.map((s, i) => (
      <SourceCard
        key={`${s.id}-${i}`}
        span={props.span}
        title={s.title}
        description={s.description}
        onClick={() => props.onSourceClick(s.id)}
      />
    ))}
  </Row>
)

export default SourceCardList
