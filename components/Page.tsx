import * as React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import styled from 'styled-components'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const BodyWrapper = styled.div`
  background-color: rgb(245, 245, 245);
  height: 100vh;
`

interface IPageProps {
  title?: string
  children: React.ReactNode
}

class Page extends React.PureComponent<IPageProps> {
  componentDidMount() {
    NProgress.configure({ showSpinner: false })
    Router.onRouteChangeStart = () => NProgress.start()
    Router.onRouteChangeComplete = () => NProgress.done()
    Router.onRouteChangeError = () => NProgress.done()
  }

  render() {
    return (
      <BodyWrapper>
        <Head>
          <title>{this.props.title || 'Spire'}</title>
        </Head>
        {this.props.children}
      </BodyWrapper>
    )
  }
}

export default Page
