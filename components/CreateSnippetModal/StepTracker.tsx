import * as React from 'react'
import { Steps, Icon } from 'antd'

interface IStepTrackerProps {
  current: number
}

const StepTracker: React.SFC<IStepTrackerProps> = ({ current }) => (
  <Steps current={current}>
    <Steps.Step key="origin" title="Origin" icon={<Icon type="github" />} />
    <Steps.Step key="source" title="Source" icon={<Icon type="file-text" />} />
    <Steps.Step key="settings" title="Settings" icon={<Icon type="setting" />} />
  </Steps>
)

export default StepTracker
