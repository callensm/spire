import * as React from 'react'
import { Layout } from 'antd'
import Navbar from '../components/Navbar'
import Page from '../components/Page'

const { Content } = Layout

class IndexPage extends React.Component {
  render() {
    return (
      <Page title="Spire | Home">
        <Layout>
          <Navbar />
          <Content>
            <div />
          </Content>
        </Layout>
      </Page>
    )
  }
}

export default IndexPage
