import * as React from 'react'
import { Skeleton } from 'antd'
import Card from '../Common/Card'

interface ISkeletonCardsProps {
  amount: number
  width: string
}

const SkeletonCards: React.SFC<ISkeletonCardsProps> = ({ amount, width }) => (
  <>
    {[...Array(amount).keys()].map(i => (
      <Card key={`skeleton-card-${i}`} style={{ width }}>
        <Skeleton active />
      </Card>
    ))}
  </>
)

export default SkeletonCards
