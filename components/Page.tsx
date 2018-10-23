import * as React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

const BodyWrapper = styled.div`
  background-color: rgb(245, 245, 245);
  height: 100vh;
`

interface IPageProps {
  title?: string
  children: React.ReactNode
}

const Page: React.SFC<IPageProps> = ({ children, title = 'Spire' }) => (
  <BodyWrapper>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </BodyWrapper>
)

export default Page
