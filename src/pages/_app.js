import '@/styles/globals.css'
import Header from "components/header";

const App = ({ Component, pageProps }) => {
  return (
    <>
        <Header />
        <Component {...pageProps} />
    </>
  )
}

export default App;
