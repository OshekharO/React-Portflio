import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Toolkit from './components/sections/Toolkit.jsx'
import Projects from './components/sections/Projects.jsx'
import Education from './components/sections/Education.jsx'
import Certifications from './components/sections/Certifications.jsx'
import BeyondCode from './components/sections/BeyondCode.jsx'
import Contact from './components/sections/Contact.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Toolkit />
        <Projects />
        <Education />
        <Certifications />
        <BeyondCode />
        <Contact />
      </main>

      <Footer />
    </>
  )
}