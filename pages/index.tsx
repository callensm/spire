import * as React from 'react'
import { Layout } from 'antd'
import Navbar from '../components/Navbar'
import Page from '../components/Page'

const { Content } = Layout

const user = {
  login: 'callensm',
  id: 1,
  avatar_url:
    'https://avatars2.githubusercontent.com/u/13121516?s=400&u=44286c3a5a8e1f3def113691ff0475dda97e3224&v=4',
  public_gists: 1
}

class IndexPage extends React.Component {
  render() {
    return (
      <Page title="Spire - Home">
        <Layout>
          <Navbar user={user} />
          <Content>
            <div />
          </Content>
        </Layout>
      </Page>
    )
  }
}

export default IndexPage
