import * as React from 'react'
import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist } from 'react-syntax-highlighter/styles/hljs'

interface ICodeProps {
  language: string
  children: string
}

const StyledHighlighter = styled(SyntaxHighlighter)`
  font-size: 0.8em;
  max-height: 15.05em;
  overflow: scroll;
  border-radius: 4px;
  border: 1px solid rgba(255, 158, 125, 0.2);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  margin-top: 1em;

  code:first-child {
    background: #fff6f3;
    text-align: center;
    color: #ff9e7d;
    padding: 10px 0 10px 15px;
    margin: -10px 10px -10px -10px;
  }
`

const Code: React.SFC<ICodeProps> = ({ children, language }) => (
  <StyledHighlighter style={githubGist} language={language} showLineNumbers>
    {children}
  </StyledHighlighter>
)

export default Code
