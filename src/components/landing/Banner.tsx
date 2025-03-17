import React from "react";
import { Shield, Droplet, Atom, Stethoscope, LucideIcon } from "lucide-react";

interface MarqueeItemProps {
  icon: LucideIcon;
  text: string;
}

const MarqueeItem: React.FC<MarqueeItemProps> = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2 mx-4">
    <Icon className="h-6 w-6" />
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default function Banner() {
  return (
    <>
      <div className="min-h-screen lg:min-h-screen relative overflow-hidden" style={{
        background: "linear-gradient(135deg, #e6f7eb 0%, #f0f9f3 100%)"
      }}>
         <div
          className="absolute inset-0 z-0"
          style={{
            height: "400px",
            width: "75%",
            top: 0,
            right: "33%",
            position: "absolute",
            WebkitMaskImage: "radial-gradient(black, black 0px, transparent 95%, transparent 100%)",
            maskImage: "radial-gradient(black, black 0px, transparent 95%, transparent 100%)",
            backgroundPosition: "center bottom 1px",
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16' fill='none' stroke='rgb(15 23 42 / 0.05)'%3e%3cpath d='M0 .5H15.5V16'/%3e%3c/svg%3e")`
          }}
        />
        <main className="relative z-10 flex flex-col md:flex-row lg:flex-row justify-between items-center px-4 mt-8 md:mt-0 lg:mt-0 max-w-screen-2xl mx-auto">
          <div className="max-w-2xl">
            <div className="flex-1 max-w-lg sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
              <div>
                <div className="text-3xl text-gray-800 font-semibold md:text-4xl lg:text-5xl">
                  <h2 className="text-xl lg:text-xl mb-4 font-thin">
                    Welcome to Sajivan Ayurveda
                  </h2>
                  <h1 className="text-md lg:text-6xl font-bold mb-6">
                    <span className="text-[#111]">Join The </span>
                    <span className="text-[#318e4c]">Digital</span>
                    <br />
                    <span
                      className="text-[#318e4c] pt-2"
                      style={{ lineHeight: "1.5" }}
                    >
                      Ayurvedic
                    </span>
                    <span className="text-[#111] pl-3">Center</span>
                  </h1>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed mt-3">
                Nam erat risus, sodales sit amet lobortis ut, finibus eget
                metus. Cras aliquam ante ut tortor posuere feugiat. Duis
                sodales nisi id porta lacinia.
              </p>
              <div>
                <a
                  className="mt-5 px-4 py-2 text-green-600 font-medium bg-green-50 rounded-full inline-flex items-center"
                  href="#"
                >
                  Try it out
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-1 duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-8 flex items-center space-x-4 text-sm text-gray-500">
              <span>✓ Trusted by 11000+ People</span>
              <span>✓ 100+ Carefully crafted UI components</span>
            </div>
          </div>

          <div className="lg:block">
            <div className="flex-1 mt-5 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
              <div>
                <img
                  src="./images/doc.png"
                  alt="Doctor"
                  className="w-full"
                  style={{
                    opacity: "1",
                    WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="w-full lg:w-full flex justify-center mx-auto items-center overflow-hidden bg-white py-3">
        <div className="flex whitespace-nowrap">
          <div className="flex">
            <MarqueeItem icon={Shield} text="NO SIDE EFFECTS" />
            <MarqueeItem icon={Droplet} text="AYUSH CERTIFIED" />
            <MarqueeItem icon={Atom} text="PLANT BASED" />
            <MarqueeItem icon={Stethoscope} text="GMP CERTIFIED" />
          </div>
        </div>
      </div>
    </>
  );
}