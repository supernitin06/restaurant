import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
    return (
      <div>
        <nav className="bg-[#141619]">
          <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <a
                href="https://flowbite.com/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-10"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Kitchen
                </span>
              </a>
             
            </div>
            <div className="flex items-center    space-x-10 rtl:space-x-reverse">
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
            
              </div>
              <div>
                <ul className="flex text-xl gap-7  text-white font font-semibold ">
                  <li className="hover:text-[#efb11d]">
                    <a href="#">Home</a>
                  </li>
                  <li className="hover:text-[#efb11d]">
                    <a href="#">About</a>
                  </li>
                  <li className="hover:text-[#efb11d]">
                    <a href="#">Services</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
};

export default Navbar;









