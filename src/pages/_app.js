import '@/styles/globals.css'
import Header from "components/header";
import Footer from 'components/footer';
import { ThemeProvider } from 'next-themes';

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
        <Header />
        <Component {...pageProps} />
        <Footer />
    </ThemeProvider>
  )
}

export default App;
