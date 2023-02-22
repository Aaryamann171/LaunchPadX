import '@/styles/globals.css'
import Header from "components/header";
import Footer from 'components/footer';
import { ThemeProvider } from 'next-themes';
import { Kanit } from '@next/font/google';

const kanit = Kanit({ 
  weight: ['400', '700'],
  subsets: ['latin'], 
});

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <main className={kanit.className}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  )
}

export default App;
