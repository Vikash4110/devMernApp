import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Make sure to import AOS styles
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";


const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { user } = useAuth();


  return (
    <>
      <br />
      <br />
      <section className="bg-gray-100 p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 text-blue-600" data-aos="fade-down">
            About Me
          </h1>
          <p>Welcome {user ?  user.username : `to our website `} </p>
          <p className="text-center text-gray-600 mb-12" data-aos="fade-up">
            I am a passionate and dedicated software developer with a focus on creating dynamic and user-friendly web applications. My goal is to leverage technology to solve real-world problems and enhance user experiences.
          </p>

          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Skills Section */}
            <div className="lg:w-1/2 mb-8" data-aos="fade-right">
              <div className="bg-blue-50 shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
                <h2 className="text-3xl font-semibold mb-4 text-blue-600">Skills</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-gray-700">🌐 Front-end Development: HTML, CSS, JavaScript, React.js</li>
                  <li className="text-gray-700">🔙 Back-end Development: Node.js, Express.js, MongoDB</li>
                  <li className="text-gray-700">⚙️ Version Control: Git, GitHub</li>
                  <li className="text-gray-700">📊 Data Structures & Algorithms</li>
                  <li className="text-gray-700">🤖 AI/ML Basics</li>
                </ul>
              </div>
            </div>

            {/* Experience Section */}
            <div className="lg:w-1/2" data-aos="fade-left">
              <div className="bg-green-50 shadow-lg rounded-lg p-6 border-l-4 border-green-500">
                <h2 className="text-3xl font-semibold mb-4 text-green-600">Experience</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-gray-700">👨‍💻 Intern at HopinMinds: Worked on AI/ML projects and developed a comprehensive website.</li>
                  <li className="text-gray-700">🌐 Freelance Developer: Developed dynamic web applications for various clients.</li>
                  <li className="text-gray-700">📚 Completed multiple projects in web development and machine learning.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-12" data-aos="fade-up">
            <div className="bg-purple-50 shadow-lg rounded-lg p-6 border-l-4 border-purple-500">
              <h2 className="text-3xl font-semibold mb-4 text-purple-600 text-center">My Values</h2>
              <p className="text-gray-600 text-center">
                I believe in continuous learning, collaboration, and striving for excellence in every project I undertake. My passion for technology drives me to stay updated with the latest trends and innovations in the industry.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 text-center" data-aos="fade-up">
            <h2 className="text-3xl font-semibold mb-4 text-red-600">Let's Connect!</h2>
            <p className="text-gray-600 mb-4">Feel free to reach out if you'd like to discuss projects, collaborations, or just connect!</p>
            <Link to="/contact">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                Contact Me
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default About;
