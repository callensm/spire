import styled from 'styled-components'
import { Card as AntCard } from 'antd'

const hoverAnimation: string = `
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.025);
    transition: background-color 0.3s ease;
  }
`

export const Meta = styled(AntCard.Meta)`
  & > * > *:first-child {
    font-size: 1.2em;
    color: #ff876c;
    font-weight: bold;
  }

  & > * > *:last-child {
    font-size: 0.8em;
    font-style: italic;
  }
`

const Card = styled(AntCard)`
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  ${props => props.hoverable && hoverAnimation};
`

export default Card
