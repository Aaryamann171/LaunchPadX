import '@/styles/globals.css'
import Header from "components/header";
import Footer from 'components/footer';
import { ThemeProvider } from 'next-themes';
import { Kanit } from '@next/font/google';
import NextNProgress from 'nextjs-progressbar';

const kanit = Kanit({ 
  weight: ['400', '700'],
  subsets: ['latin'], 
});


const App = ({ Component, pageProps }) => {

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <main className={kanit.className}>
        <NextNProgress color="linear-gradient(to right, rgb(202, 138, 4), rgb(220, 38, 38))" />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </ThemeProvider>
  )
}

export default App;
