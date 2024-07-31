// import { Analytics } from "../components/Analytics";
import { useEffect } from "react";
import AOS from "aos";
import { Link } from "react-router-dom";
import RegisImg from "../assets/regis.svg"; // Ensure this path is correct
import Footer from "../components/Footer";

 const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <>
    <br />
    <br />
      <main className="bg-gray-100">
        <section className="flex flex-col lg:flex-row items-center justify-between p-8 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
          <div className="lg:w-1/2 space-y-4" data-aos="fade-right">
            <p className="text-lg font-semibold">We are the World Best IT Company</p>
            <h1 className="text-5xl font-bold">Welcome</h1>
            <p className="text-lg">
              Are you ready to take your business to the next level with cutting-edge IT solutions? Look no further! Here, we specialize in providing innovative IT services and solutions tailored to meet your unique needs.
            </p>
            <div className="flex space-x-4">
              <Link to="/contact">
                <button className="bg-yellow-500 text-gray-800 px-6 py-2 rounded hover:bg-yellow-600 transition duration-300">
                  Connect Now
                </button>
              </Link>
              <Link to="/service">
                <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="lg:w-1/2 mt-8 lg:mt-0" data-aos="fade-left">
            <img
              src={RegisImg}
              alt="coding together"
              className="w-full h-auto object-cover "
            />
          </div>
        </section>
      </main>

      {/* 2nd section */}
      {/* <Analytics /> */}

      {/* 3rd section */}
      <section className="flex flex-col lg:flex-row items-center justify-between p-8 bg-white">
        <div className="lg:w-1/2 mt-8 lg:mt-0" data-aos="fade-right">
          <img
            src={RegisImg}
            alt="coding together"
            className="w-full h-auto object-cover "
          />
        </div>

        <div className="lg:w-1/2 space-y-4" data-aos="fade-left">
          <p className="text-lg font-semibold text-blue-600">We are here to help you</p>
          <h1 className="text-5xl font-bold text-gray-800">Get Started Today</h1>
          <p className="text-lg text-gray-600">
            Ready to take the first step towards a more efficient and secure IT infrastructure? Contact us today for a free consultation and let's discuss how Thapa Technical can help your business thrive in the digital age.
          </p>
          <div className="flex space-x-4">
            <Link to="/contact">
              <button className="bg-yellow-500 text-gray-800 px-6 py-2 rounded hover:bg-yellow-600 transition duration-300">
                Connect Now
              </button>
            </Link>
            <Link to="/service">
              <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Home;