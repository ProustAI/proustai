import * as React from 'react'
import Header from './header'
import Footer from './footer'

interface MarketingLayoutProps extends React.PropsWithChildren {}

const MarketingLayout: React.FunctionComponent<MarketingLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default MarketingLayout
