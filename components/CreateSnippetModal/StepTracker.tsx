import * as React from 'react'
import { Steps, Icon } from 'antd'

interface IStepTrackerProps {
  current: number
}

const StepTracker: React.SFC<IStepTrackerProps> = ({ current }) => (
  <Steps current={current}>
    <Steps.Step key="source" title="Choose Source" icon={<Icon type="github" />} />
    <Steps.Step key="input" title="Paste URL" icon={<Icon type="link" />} />
  </Steps>
)

export default StepTracker
