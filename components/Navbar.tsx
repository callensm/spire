import * as React from 'react'
import styled from 'styled-components'
import { Layout, Button, Modal, Card } from 'antd'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { githubGist } from 'react-syntax-highlighter/styles/hljs'
import axios from 'axios'

// async function getGistIDList(username: string): Promise<string[]> {
//   const res = await axios.get(`https://api.github.com/users/${username}/gists`)
//   return res.data.map(item => item.id)
// }

async function getGistDetails(id: string): Promise<any> {
  const res = await axios.get(`https://api.github.com/gists/${id}`)
  const { files } = res.data
  return Object.keys(files).map(k => files[k])
}

const { Header } = Layout

// const gistRegexp: RegExp = /https:\/\/gist.github.com\/\w+\/([0-9a-f]+)/g

const Bar = styled(Header)`
  background-color: white;
  border-bottom: 1px solid rgb(225, 225, 225);
  display: flex;
  flex-direction: row;
`

const Heading = styled.h1`
  color: #ff876c;
  flex-grow: 1;
  margin-bottom: 0;
`

const SubMenu = styled.section`
  display: flex;
  align-items: center;
  button:first-child {
    margin-right: 1.5em;
  }
`

interface INavbarState {
  modal: boolean
  gists: any[]
}

class Navbar extends React.Component<{}, INavbarState> {
  state = {
    modal: false,
    gists: []
  }

  setModal = async (show: boolean) => {
    if (show) {
      // const ids: string[] = await getGistIDList('callensm')
      const details = ['7621795'].map(i => getGistDetails(i)) // ids.map(i => getGistDetails(i))
      await Promise.all(details).then(value => this.setState({ gists: value[0] }))
    }

    console.log(this.state.gists)

    this.setState({ modal: show })
  }

  render() {
    return (
      <Bar>
        <Heading>Spire</Heading>
        <SubMenu>
          <Button type="primary" icon="code" onClick={() => this.setModal(true)}>
            New Snippet
          </Button>
          <Button icon="github">Login with GitHub</Button>
        </SubMenu>
        <Modal
          centered
          title="Create a New Snippet"
          visible={this.state.modal}
          okText="Create"
          cancelText="Discard"
          destroyOnClose={true}
          closable={false}
          onCancel={() => this.setModal(false)}
        >
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {this.state.gists.map((g, i) => (
              <Card
                key={i}
                style={{
                  maxHeight: '15em',
                  overflow: 'scroll',
                  boxShadow: '0px 1px 3px 2px rgba(0, 0, 0, 0.15)'
                }}
              >
                <SyntaxHighlighter
                  showLineNumbers
                  style={githubGist}
                  customStyle={{ fontSize: '0.75em' }}
                >
                  {g.content}
                </SyntaxHighlighter>
              </Card>
            ))}
          </div>
        </Modal>
      </Bar>
    )
  }
}

export default Navbar
