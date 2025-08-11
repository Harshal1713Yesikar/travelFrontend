import React, { useState } from "react";
import { Cloud, Plane, Headphones, Settings } from 'lucide-react';
import useScrollAnimation from "../useScrollAnimation";
import { Link, Links } from "react-router-dom";
import { Mail, Send } from 'lucide-react';
import toast from "react-hot-toast";
import SplashCursor from "../components/nurui/splash-cursor";
import GradientText from "components/nurui/gradient-text";
import { GlowCard } from "../components/nurui/spotlight-card";
import { cn } from "../lib/utils";
import { GradientBackground } from "../components/nurui/gradient-background";
const containerStyle = {
  display: "flex",
  gap: 24,
  padding: 24,
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-start",
  background: "none",
  fontFamily: "var(--font-family)",
  margin: 0,
};
const fileContainerStyle = {
  width: 388,
  height: 378,
  borderRadius: "1em",
  position: "relative",
  overflow: "hidden",
  padding: 0,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "none",
  boxSizing: "border-box",
};


const services = [
  {
    id: 1,
    icon: Cloud,
    title: "Calculated Weather",
    description: "Built Wicket longer admire do barton vanity itself do in it.",
    featured: false
  },
  {
    id: 2,
    icon: Plane,
    title: "Best Flight",
    description: "Built Wicket longer admire do barton vanity itself do in it.",
    featured: true
  },
  {
    id: 3,
    icon: Headphones,
    title: "Engrossed Listening",
    description: "Engrossed listening. Park gate sell they west hard for the.",
    featured: false
  },
  {
    id: 4,
    icon: Settings,
    title: "Calculated Weather",
    description: "Built Wicket longer admire do barton vanity itself do in it.",
    featured: false
  }
];


const Home = () => {

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [data, setData] = useState({
    email: ""
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_Backend_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },);

      const result = await res.json();
      console.log("API Response:", result);

      if (res.ok) {
        setIsSubscribed(true);
        toast.success("🎉 Subscribed successfully!", { position: "bottom-right" });
        setData({ email: "" });


        setTimeout(() => {
          setIsSubscribed(false);
        }, 3000);
      } else {
        toast.error(result.msg || "Subscription Failed", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong!", { position: "bottom-right" });
    }
  };
  useScrollAnimation()
  return (
    <>


      <div class="relative overflow-hidden justify-center flex-col min-h-screen flex  px-10 pb-10 sm:mx-auto sm:px-22  ">
        <div className="md:flex justify-center mt-8 md:ml-6">

          <div className=" mt-8 md:mt-24 px-4 md:px-0">
            <p className="text-[#DF6951] font-bold  md:text-left animate-on-scroll">
              BEST DESTINATION AROUND THE WORLD
            </p>

            <div>
              <GradientText>
                <p className="text-6xl font-black">
                  Travel, enjoy <br /> and live a new <br /> and full life
                </p>
              </GradientText>
            </div>

            <p className="font-medium mt-6 md:mt-9 space-y-6 py-3 text-base leading-7 text-[#5E6282] md:text-left animate-on-scroll">
              Built Wicket longer admire do barton vanity itself do in it.
              <br />
              Preferred to sportsmen it engrossed listening. Park gate <br />
              sell they west hard for the.
            </p>
            <div className="flex justify-center md:justify-start items-center mt-6 md:mt-14 space-x-6">
              <button className="w-36 h-12 rounded-md bg-[#F1A501] text-white font-medium cursor-pointer text-center animate-on-scroll hover:translate-y-[-3px] transition-transform">
                Find out more
              </button>
              <div className="flex items-center space-x-2 cursor-pointer animate-on-scroll hover:translate-y-[-3px] transition-transform">
                <img src="/Image/Play button.png" alt="Play Button" className="h-10 w-10" />
                <span className="text-[#5E6282] font-medium">Play Demo</span>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 h-auto mt-12 md:mt-0 flex justify-center items-center ">
            <img className="w-full" src="/Image/Decore (2).png" alt="Decor" />/
            <img
              className="absolute top-[43%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 h-5/6 w-5/4 z-40 mt-3 animate-slideIn "
              src="/Image/Traveller 1.png"
              alt="Traveller"
            />
            <img
              className="absolute top-[15%] left-[32%] transform -translate-x-1/2 -translate-y-1/2 animate-slideIn w-20"
              src="/Image/Plan.png"
              alt="Plan"
            />
            <img
              className="absolute top-[22%] left-[88%] transform -translate-x-1/2 -translate-y-1/2 animate-slideIn w-20 "
              src="/Image/Plan.png"
              alt="Plan"
            />
          </div>
        </div>

        {/* -----------------------------------------||---------------------------------------------------- */}



        {/* --------------------------------------CATEGORY-------------------------------------------- */}



        <div className="md:flex justify-center items-center animate-on-scroll gap-12 md:gap-48 mt-32">
          <div className="text-center md:text-left md:ml-72">
            <p className="text-[#5E6282] flex text-center justify-center font-medium">CATEGORY</p>
            <h2 className="text-[#14183E] mt-5 font-inika text-3xl md:text-5xl font-bold">
              WE OFFER BEST SERVICES
            </h2>
          </div>
          <div className="mt-8 animate-on-scroll">
            <img src="\Image\calender.png" alt="Calendar Icon" className="mx-auto md:mx-0" />
          </div>

        </div>

        <section className="py-16 px-4 sm:px-6 lg:px-8 animate-on-scroll">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className={`relative group ${service.featured
                      ? 'transform lg:-translate-y-8'
                      : ''
                      }`}
                  >
                    <div
                      className={`
                    h-64 sm:h-72 lg:h-80 w-full
                    flex flex-col items-center justify-center text-center
                    p-6 sm:p-8
                    transition-all duration-300 ease-in-out
                    hover:transform hover:-translate-y-2
                    ${service.featured
                          ? 'bg-white rounded-3xl shadow-2xl border border-gray-100'
                          : 'bg-transparent hover:bg-white hover:rounded-3xl hover:shadow-xl'
                        }
                  `}
                    >

                      <div className={`
                    w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24
                    rounded-2xl flex items-center justify-center mb-6 sm:mb-8
                    transition-all duration-300
                    ${service.featured
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-500 group-hover:to-purple-600 group-hover:shadow-lg'
                        }
                  `}>
                        <Icon className={`
                      w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12
                      transition-colors duration-300
                      ${service.featured
                            ? 'text-white'
                            : 'text-gray-600 group-hover:text-white'
                          }
                    `} />
                      </div>


                      <h3 className="text-[#1E1D4C] font-semibold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">
                        {service.title}
                      </h3>
                      <p className="font-medium text-[#5E6282] text-sm sm:text-base lg:text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {service.featured && (
                      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl opacity-20 -z-10"></div>
                    )}
                  </div>
                );
              })}
            </div>


            <div className="relative mt-16">
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-60"></div>
              <div className="absolute top-8 right-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-40"></div>
              <div className="absolute -top-4 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-80"></div>
            </div>
          </div>
        </section>



        {/* -----------------------------------------||---------------------------------------------------- */}


        {/* ---------------------------------------- TOP SELLING ------------------------------------------------- */}

        <div className="container mx-auto px-4 ">

          <div className="animate-on-scroll text-center">
            <div className=" text-[#5E6282] font-medium ">TOP SELLING</div>
            <div div className=" text-[#14183E] mt-5 font-inika text-3xl md:text-5xl md:gap-5 font-bold">TOP DESTINATION</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-16 place-items-center">

            <div className="rounded-xl shadow-xl text-[#FFE6E3] max-w-sm  transform transition-transform duration-500 hover:scale-105 hover:brightness-90 ">
              <GlowCard className="h-[400px] w-[300px] flex flex-col items-center p-4">
                <img
                  src="https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Rome, Italy"
                  className="mb-6 h-60 w-64 rounded-xl"
                />

                <div className="text-center font-medium text-[#5E6282]">
                  Rome, Italy <span className="ml-9"> $5.42k</span>

                  <div className="ml-2 flex text-center p-3">
                    <div >
                      <img
                        className="my-3 hover:translate-y-[-2px] transition-transform duration-300"
                        src="\Image\navigation 1.png"
                        alt="Navigation Icon"
                      />
                    </div>
                    <div className="ml-2 mt-2">10 day trip</div>
                  </div>
                </div>
              </GlowCard>

            </div>


            <div className=" rounded-xl  shadow-xl text-[#FFE6E3]  max-w-sm transform transition-transform duration-500 hover:scale-105 hover:brightness-90 ">

              <GlowCard className="h-[400px] w-[300px] flex flex-col items-center p-4">

                <img src="https://images.pexels.com/photos/372490/pexels-photo-372490.jpeg?auto=compress&cs=tinysrgb&w=600" alt=""
                  className=" mb-6 h-60 w-64 rounded-xl" />


                <div className=" text-center font-medium  text-[#5E6282]">
                  Landon,UK <span className="ml-9"> $4,2k</span>

                  <div className=" flex text-center p-3 ">
                    <div>
                      <img className=" ml-4 my-3 hover:translate-y-[-2px] transition-transform duration-300 " src="\Image\navigation 1.png" alt="" />
                    </div>
                    <div className="ml-2 mt-2 ">12 day trip</div>
                  </div>
                </div>
              </GlowCard>
            </div>

            <div className=" -sm transform transition-transform duration-500 hover:scale-105 hover:brightness-90 ">

              <GlowCard className="h-[400px] w-[300px] flex flex-col items-center p-4">
                <img src="https://images.pexels.com/photos/3264723/pexels-photo-3264723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""
                  className=" mb-6 h-60 w-64 rounded-xl" />
                <div className=" text-center font-medium  text-[#5E6282]">
                  Full Europe <span className="ml-9"> $10,2k</span>

                  <div className=" flex text-center p-3 ">
                    <div>
                      <img className=" ml-4 my-3 hover:translate-y-[-2px] transition-transform duration-300 " src="\Image\navigation 1.png" alt="" />
                    </div>
                    <div className="ml-2 mt-2 ">28 day trip</div>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>

        {/* -----------------------------------------||---------------------------------------------------- */}

        {/* --------------------------------------------Booking-------------------------------------------------- */}

        <div className="animate-on-scroll">
          <div className="text-center mt-24">
            <p className="text-[#5E6282] font-medium">Booking</p>
            <h2 className="text-[#14183E] font-inika text-4xl sm:text-5xl font-bold mt-2">Booking Wave</h2>
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-16 px-6 md:px-16">
            <div className="max-w-lg">
              <p className="text-[#5E6282] font-medium mb-4">EASY AND FAST</p>
              <h2 className="text-[#14183E] font-volkhov text-3xl md:text-5xl font-bold leading-tight">
                Book your next trip <br />
                in 3 easy steps
              </h2>

              {[
                {
                  icon: "/Image/Group 7.png",
                  title: "Choose Destination",
                  text: "Find the perfect place that aligns with your interests and travel goals."
                },
                {
                  icon: "/Image/Group 12.png",
                  title: "Make Payment",
                  text: "Complete your booking securely and effortlessly online."
                },
                {
                  icon: "/Image/Group 11.png",
                  title: "Reach Airport on Selected Date",
                  text: "Arrive at the airport on your chosen date for a smooth check-in and journey."
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start mt-10 gap-4">
                  <img src={step.icon} alt={`${step.title} icon`} className="w-10 h-10" />
                  <div>
                    <p className="text-[#5E6282] font-bold">{step.title}</p>
                    <p className="text-[#5E6282] font-poppins text-sm">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-12 md:mt-0 w-full max-w-sm">
              <div className="absolute -z-10 top-0 right-0">
                <img src="/Image/Ellipse 8.png" alt="Decorative Ellipse" />
              </div>

              <div className="relative z-10 bg-white shadow-lg rounded-[25px] p-6">
                <img src="/Image/Bookingimg.jpg" alt="Trip to Greece image" className="rounded-lg mx-auto" />
                <p className="text-[#080809] mt-6 font-bold">Trip to Greece</p>
                <p className="text-[#5E6282] text-sm font-poppins mt-2">14-29 June | by Robbin Joseph</p>

                <div className="flex gap-3 mt-3">
                  {["LEAF.png", "map icon.png", "send.png"].map((icon, i) => (
                    <img
                      key={i}
                      src={`/Image/${icon}`}
                      alt={icon.split(".")[0]}
                      className="w-6 h-6 hover:-translate-y-1 transition-transform"
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <img src="/Image/building 1.png" alt="Travelers icon" />
                  <p className="text-[#5E6282] text-sm">24 people going</p>
                  <img
                    src="/Image/dil img.png"
                    alt="Like icon"
                    className="ml-auto w-6 h-6 hover:-translate-y-1 transition-transform"
                  />
                </div>
              </div>

              <div className="absolute top-[18rem] right-[-4rem] z-50 bg-white p-4 rounded-[25px] shadow-md w-64">
                <div className="flex items-center gap-4">
                  <img src="/Image/Mini img.png" alt="Mini trip thumbnail" className="w-12 h-12" />
                  <div>
                    <p className="text-[#5E6282] text-xs">Ongoing</p>
                    <p className="font-bold">Trip to Rome</p>
                    <p className="text-sm mt-1">
                      <span className="text-[#8A79DF]">40%</span> Completed
                    </p>
                    <img src="/Image/Group 3.png" alt="Progress bar" className="mt-2" />
                  </div>
                </div>
              </div>

              <Link to="/booking">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2268/2268536.png"
                  alt="Booking Icon"
                  className="w-12 mt-10 mx-auto hover:scale-110 transition-transform"
                />
              </Link>
            </div>
          </div>

          <div className="relative mt-8">
            <div className="absolute top-0 left-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-4 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
            <div className="absolute -top-2 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-80 animate-pulse delay-500"></div>
          </div>
        </div>


        {/* ------------------------------------------------- AboutUS--------------------------------------------------- */}


        {/* -----------------------------------------||---------------------------------------------------- */}
        <div className=" md:flex justify-center gap-52 mt-36 animate-on-scroll">
          <div className=" mt-10">

            <p className="font-medium text-[#5E6282] "> TESTIMONIALS</p>
            <p className=" text-[#14183E] mt-5 font-volkhov text-5xl font-bold">What people Say <br />
              about Us.</p>

            <img className="  ml-2 mt-14" src="\Image\Group 61.png" alt="" />
          </div>


          <div className="relative h-96 flex justify-center items-center md:-mt-0 ">

            <img
              src="\Image\Image.png"
              alt=""
              className=" mb-72 hover:scale-105 hover:brightness-100"
            />
            <div className="absolute z-50 w-96 p-6 flex flex-col shadow-xl  bg-white rounded-lg">
              <p className="text-[#5E6282] font-poppins">
                “On the Windows talking painted pasture yet its
                express parties use. Sure last upon he same
                as knew next. Of believed or diverted no.”
              </p>
              <p className="mt-10 text-[#5E6282] font-bold">Harshal Yesikar</p>
              <p className="text-[#5E6282]">Indore,India</p>
            </div>

            <div className=" z-10 h-40 w-96 p-10 flex flex-col shadow-[0_0_2px_rgba(20,10,10,0.10)] bg-white rounded-lg mt-52 ">
              <p className="text-[#5E6282] font-volkhov">
              </p>
              <p className="mt-16 text-[#5E6282] font-bold">Praful Marathe</p>
              <p className="text-[#5E6282]"> Khetia,Pansemal</p>
            </div>

          </div>

        </div>
        <div className="relative mt-8">
          <div className="absolute -top-2 right-1/5 w-1 h-1 bg-purple-400 rounded-full opacity-80 animate-pulse delay-500"></div>
          <div className="absolute top-0 left-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-4 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
        </div>


        <div className=" ml-4 p-28   flex flex-wrap  items-center gap-20 animate-on-scroll  ">
          <img className=" transform transition-transform duration-500 hover:scale-105 hover:brightness-90" src="\Image\image 27.png" alt="" />
          <img className=" transform transition-transform duration-500 hover:scale-105 hover:brightness-90" src="\Image\image 28.png" alt="" />
          <img className=" transform transition-transform duration-500 hover:scale-105 hover:brightness-90" src="\Image\image 29.png" alt="" />
          <img className=" transform transition-transform duration-500 hover:scale-105 hover:brightness-90" src="\Image\image 30.png" alt="" />
          <img className=" transform transition-transform duration-500 hover:scale-105 hover:brightness-90" src="\Image\image 31.png" alt="" />
        </div>

        {/* --------------------------------------------------------------------------------------bg-[#eeedf3]--------- */}

        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-[450px] relative overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    src="https://img.freepik.com/premium-vector/travel-concept-with-suitcase-sunglasses-hat-camera-blue-background-flying-plane-back_255343-81.jpg?semt=ais_hybrid"
                    alt="Travel concept with suitcase, sunglasses, hat, camera and flying plane"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent lg:hidden"></div>
                </div>

                <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                  <div className="max-w-md mx-auto lg:mx-0">
                    <div className="text-center lg:text-left mb-8 lg:mb-12">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-4 lg:mb-6">
                        Get special offers, and
                        <span className="block text-blue-600">more from Traveler</span>
                      </h2>
                      <p className="text-[#5E6282] text-base sm:text-lg lg:text-xl leading-relaxed">
                        Subscribe to see secret deals and prices drop the moment you sign up!
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          className="w-full h-12 sm:h-14 pl-12 pr-16 sm:pr-36 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-gray-900 placeholder-gray-500"
                          placeholder="Enter your email address"
                          required
                          disabled={isSubscribed}
                        />
                        <button
                          type="submit"
                          disabled={isSubscribed}
                          className="absolute top-1/2 right-2 -translate-y-1/2 h-8 sm:h-10 px-4 sm:px-6 bg-gradient-to-r from-[#fdbd33] to-[#f39c12] text-white font-semibold rounded-full hover:from-[#e6a800] hover:to-[#d68910] hover:shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                        >
                          {isSubscribed ? (
                            <>
                              <span className="text-sm">✓</span>
                              <span className="hidden sm:inline text-sm">Done</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span className="hidden sm:inline text-sm">Subscribe</span>
                            </>
                          )}
                        </button>
                      </div>

                      {isSubscribed && (
                        <div className="text-center lg:text-left">
                          <p className="text-green-600 text-sm font-medium animate-fade-in">
                            🎉 Successfully subscribed! Check your email for exclusive deals.
                          </p>
                        </div>
                      )}
                    </form>

                    <div className="mt-6 lg:mt-8 text-center lg:text-left">
                      <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span>No spam, ever</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span>Unsubscribe anytime</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span>10k+ subscribers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8">
              <div className="absolute top-0 left-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-4 right-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
              <div className="absolute -top-2 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-80 animate-pulse delay-500"></div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------------------------------------- */}
      </div>


      <div className="bg-gray-100 py-16  px-6 mt-16 sm:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 mt-12 animate-on-scroll">
          <div className="text-center md:text-left">
            <p className="font-poppins font-semibold text-4xl">Jaddoo.</p>
            <p className="w-full md:w-64 text-[#5E6282] mt-7 font-normal">
              Book your trip in minutes and get full control for much longer.
            </p>
          </div>


          <div>
            <p className="font-bold text-2xl">Company</p>
            <div className="mt-7 space-y-2">
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/hotelList">
                  Hotel
                </Link>
              </p>
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">

                <Link to="/flight">
                  Flights
                </Link>
              </p>
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/booking">
                  Bookings
                </Link>
              </p>
            </div>
          </div>


          <div>
            <p className="font-bold text-2xl">Contact</p>
            <div className="mt-7 space-y-2">
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/sighup">
                  Sign up
                </Link>
              </p>
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/login">
                  Login
                </Link>

              </p>
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/contactUs">
                  ContactUs
                </Link>

              </p>
            </div>
          </div>


          <div>
            <p className="font-bold text-2xl">Support</p>
            <div className="mt-7 space-y-2">
              <p className="text-slate-600 font-bold font-poppins  hover:text-orange-500 transition-colors flex justify-center w-36  ">
                <img src="https://cdn-icons-png.flaticon.com/128/10542/10542947.png" alt="" className="w-5 h-5 mr-2 " />+123-456-7890

              </p>
              <p className="text-slate-600 font-bold font-poppins  hover:text-orange-500 transition-colors flex justify-center w-36  ">
                <img src="https://cdn-icons-png.flaticon.com/128/1944/1944502.png" alt="" className="w-5 h-5 mr-2 " />+123-456-7890

              </p>
              <p className="text-slate-600 font-bold font-poppins  hover:text-orange-500 transition-colors flex justify-center w-36  ">
                <img src="https://cdn-icons-png.flaticon.com/128/546/546394.png" alt="" className="w-5 h-5 mr-1 " /> xyz@gmail.com

              </p>
            </div>
          </div>


          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start space-x-5 ml-4">
              <a href="https://www.facebook.com/groups/travelingtheworlds/"
                target="_blank"
                rel="noopener noreferrer"
              >


                <img
                  className="hover:translate-y-[-5px] transition-transform duration-300 rounded-full cursor-pointer h-9 w-10"
                  src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                  alt="Social Icon 1"
                />
              </a>
              <a
                href="https://www.instagram.com/bestintravel/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="hover:translate-y-[-5px] transition-transform duration-300 rounded-full cursor-pointer h-10 w-10"
                  src="https://cdn-icons-png.flaticon.com/128/15713/15713420.png"
                  alt="Instagram"
                />
              </a>

              <a
                href="https://x.com/traweltheworld"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="hover:translate-y-[-5px] transition-transform duration-300 rounded-full cursor-pointer h-10 w-10"
                  src="https://cdn-icons-png.flaticon.com/128/3670/3670127.png"
                  alt="Social Icon 3"
                />
              </a>
            </div>
            <p className="mt-4 text-slate-600 font-bold font-poppins text-center mr-4">Discover our app</p>
            <div className="flex justify-center md:justify-start items-center gap-2 mt-4">
              <img src="/Image/Google Play.png" alt="Google Play" />
              <img src="/Image/Play Store.png" alt="Play Store" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center border-t pt-6">
          <p className="text-slate-600 font-serif font-bold">
            All rights reserved @jadoo.com
          </p>
        </div>
      </div>


      <SplashCursor />
    </>


  );
};

export default Home;