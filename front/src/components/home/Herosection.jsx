import Image from 'next/image'
import React from 'react'
import { FaMapMarkerAlt, FaHome, FaSearch } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";


const HeroSection = () => {
    return (
        <div className="relative w-full h-[380px]">
            <Image
                src="/wall.jpg"
                alt="Hero Image"
                fill
                priority
                className="object-cover "
            />

            <div className="absolute top-0 left-0 w-full gap-6 h-full bg-black/50 flex flex-col justify-center items-center">
                <div className="text-white text-5xl font-light tracking-wide">
                    Start your <span className="font-semibold">#ApnaGharApnaKal</span> Journey
                </div>

            </div>
        </div>
    );
}

export default HeroSection
