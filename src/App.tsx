import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-50">
      <Navbar />
      <main className="pt-16">
        <section id="home" className="h-screen flex flex-col-reverse md:flex-row items-center justify-center px-8"> 
          <div className="flex-1 text-left space-y-6 pl-12 transition-transform duration-500 hover:-translate-x-4 text-center md:text-left"> 
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-gray-800 hover:text-blue-600 transform transition-all duration-500 ease-in-out hover:scale-110">
              Pawan Kuamar Pandit
            </h1>
            <div className="flex items-center justify-center md:justify-start space-x-4"> 
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 hover:text-green-600  transition-all duration-500 ease-in-out hover:scale-105">
                Full Stack Developer
              </p>
              <div className="md:hidden"> 
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 inline-block"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0"> 
            <img
              src="/profile.jpg" 
              alt="Profile"
              className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </section>
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}

export default App;

