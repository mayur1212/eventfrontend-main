import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import ftcLogo from "../../assets/footer-logo.jpg"; // Replace with your actual logo path

const Footer = () => {
  return (
    <footer className="bg-[#1c1a1a] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 items-start">
        {/* Logo & Social */}
        <div className="md:col-span-1">
          <img src={ftcLogo} alt="FTC Logo" className="h-12 mb-6" />
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300 transition"><FaFacebookF size={20} /></a>
            <a href="#" className="text-white hover:text-gray-300 transition"><FaYoutube size={20} /></a>
            <a href="#" className="text-white hover:text-gray-300 transition"><FaInstagram size={20} /></a>
            <a href="#" className="text-white hover:text-gray-300 transition"><FaLinkedinIn size={20} /></a>
          </div>
        </div>

        {/* Column 1 - Navigation */}
        <div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">About FTC</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">About FIRST®</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Our Supporters</a></li>
          </ul>
        </div>

        {/* Column 2 - Programs */}
        <div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-400 transition">Games & Seasons</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Resource Library</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Register as Volunteer</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Register your Team</a></li>
          </ul>
        </div>

        {/* Column 3 - Legal */}
        <div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-400 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Shipping & Refund Policy</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} All Rights Reserved by FIRST® Tech Challenge | India Program Delivery Partner - InfinityX
      </div>
    </footer>
  );
};

export default Footer;
