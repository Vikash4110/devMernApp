import { useEffect } from "react";
import { useAuth } from "../store/auth";
import AOS from "aos";
import "aos/dist/aos.css";
import ServiceImg from "../assets/3640101.webp";

const Service = () => {
  const { services } = useAuth();
  console.log(services);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <br /><br />
      <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-8 text-blue-900">Our Services</h1>
          <p className="text-lg text-blue-700 mb-12">
            Explore our range of professional services tailored to your needs.
          </p>
        </div>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((curElem, index) => (
            <div
              className={`bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 p-6 border-t-4 ${
                index % 2 === 0 ? "border-blue-500" : "border-green-500"
              }`}
              key={index}
              data-aos="fade-up"
            >
              <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                <img
                  src={ServiceImg}
                  alt={curElem.service}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-medium text-gray-700">{curElem.provider}</p>
                <p className="text-lg font-semibold text-green-600">{curElem.price}</p>
              </div>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">{curElem.service}</h2>
              <p className="text-gray-600 mb-4">{curElem.description}</p>
              <button
                className={`px-4 py-2 text-white rounded-lg transition-colors duration-300 ${
                  index % 2 === 0
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Service;
