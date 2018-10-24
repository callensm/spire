import * as React from 'react'
import styled from 'styled-components'
import { Layout, Button, Modal, Avatar, Dropdown, Menu } from 'antd'
import GitHubAPI from '../../lib/githubApi'
import CreateSnippetModal from './CreateSnippetModal'

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
  modalLoading: boolean
  gists: any[]
}

interface INavbarProps {
  user: any | null
}

class Navbar extends React.Component<INavbarProps, INavbarState> {
  state = {
    modal: false,
    modalLoading: false,
    gists: []
  }

  openModal = async () => {
    if (!this.props.user) {
      Modal.warning({
        title: 'Log In',
        content: 'You must be logged in through GitHub to post new snippets.'
      })
      return
    }

    this.setState({ modal: true, modalLoading: true })

    const ids: string[] = await GitHubAPI.getGistIDs(this.props.user.login)
    const details = ids.map(i => GitHubAPI.getGistDetails(i)) // ids.map(i => getGistDetails(i))
    await Promise.all(details).then(value => this.setState({ gists: value }))
    this.setState({ modalLoading: false })
  }

  closeModal = () => this.setState({ modal: false })

  render() {
    return (
      <Bar>
        <Heading>Spire</Heading>
        <SubMenu>
          <Button type="primary" icon="code" onClick={this.openModal}>
            New Snippet
          </Button>
          {this.props.user ? (
            <Dropdown
              placement="bottomCenter"
              overlay={
                <Menu>
                  <Menu.Item key="logout">
                    <a onClick={() => alert('logout')}>Log Out</a>
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Avatar style={{ cursor: 'pointer' }} src={this.props.user.avatar_url} />
            </Dropdown>
          ) : (
            <Button icon="github">Login with GitHub</Button>
          )}
        </SubMenu>
        <CreateSnippetModal
          visible={this.state.modal}
          gists={this.state.gists}
          loading={this.state.modalLoading}
          onClose={this.closeModal}
        />
      </Bar>
    )
  }
}

export default Navbar
