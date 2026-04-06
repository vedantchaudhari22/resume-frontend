import { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Navbar */}
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
        <a href="/">
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-8 text-slate-800">
          <a href="#" className="hover:text-purple-600 transition">
            Home
          </a>
          <a href="#features" className="hover:text-purple-600 transition">
            Features
          </a>
          <a href="#testimonials" className="hover:text-purple-600 transition">
            Testimonials
          </a>
          <a href="#cta" className="hover:text-purple-600 transition">
            Contact
          </a>
        </div>

        {/* Public CTA */}
        <div className="flex gap-2">
          <Link
            to="/app"
            className="hidden md:block px-6 py-2 bg-purple-500 hover:bg-purple-700 active:scale-95 transition-all rounded-full text-white"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden active:scale-90 transition"
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="/" className="text-white">Home</a>
        <a href="#features" className="text-white">Features</a>
        <a href="#testimonials" className="text-white">Testimonials</a>
        <a href="#cta" className="text-white">Contact</a>

        <button
          onClick={() => setMenuOpen(false)}
          className="size-10 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center"
        >
          X
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-40 text-black">
        <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 bg-purple-300 blur-[100px] opacity-30"></div>

        {/* Avatars + Stars */}
        <div className="flex items-center mt-24">
          <div className="flex -space-x-3 pr-3">
            <img src="https://randomuser.me/api/portraits/women/1.jpg" className="size-8 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/men/2.jpg" className="size-8 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/men/3.jpg" className="size-8 rounded-full border-2 border-white" />
          </div>

          <div>
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <svg key={i} width="16" height="16" className="fill-purple-600">
                  <path d="M12 2l3 6 6 .9-4.5 4.4 1 6.7L12 17l-5.5 3 1-6.7L3 8.9 9 8z"/>
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-700">Used by 10,000+ users</p>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4">
          Land your dream job with{" "}
          <span className="bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent">
            AI-powered
          </span>{" "}
          resumes.
        </h1>

        <p className="max-w-md text-center text-base my-7">
          Create, edit and download professional resumes with AI-powered assistance.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            to="/app"
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-9 h-12 flex items-center ring-1 ring-purple-400"
          >
            Get started
          </Link>

          <button className="flex items-center gap-2 border border-slate-400 hover:bg-purple-50 rounded-full px-7 h-12 text-slate-700">
            Try demo
          </button>
        </div>

        <p className="py-6 text-slate-600 mt-14">
          Trusted by leading brands
        </p>

        <div className="flex flex-wrap justify-center gap-6 max-w-3xl w-full mx-auto py-4">
          {logos.map((logo, index) => (
            <img key={index} src={logo} className="h-6" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;