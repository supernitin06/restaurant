"use client"
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react"; // lucide-react for star icons
import { useRouter } from "next/navigation";

// Array of random images
const restaurantImages = [
  "/1.jpg",
  "/2.jpeg",
  "/3.jpg",
  "/4.jpg",
  "/5.avif"

];

// Restaurant Card Component

const RestaurantCard = ({ name, location, cuisine, image, resid }) => {
  const router = useRouter();
  // Default rating = 4 stars
  const rating = 4;
  
  const handleClick = () => {
    router.push(`/restaurant/${resid}`);
  } 

  return (
    <div
    onClick={handleClick}
    className="bg-white shadow-lg rounded-2xl p-5 w-80 hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
      {/* Restaurant Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-44 object-cover rounded-xl mb-4"
      />

      {/* Restaurant Info */}
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-gray-600">{location}</p>
      <p className="text-gray-500 italic mb-3">{cuisine}</p>

      {/* Rating Section */}
      <div className="flex justify-end items-center space-x-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className={`${
              index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};




const Allrestaurant = ({data}) => {
  

  return (
    <div className="container mx-auto p-6 flex flex-wrap justify-around  gap-6">
      {data?.map((restaurant, index) => {
       
        return (
          <RestaurantCard
            key={restaurant.id }
            resid={restaurant.id}
            name={restaurant.name}
            location={restaurant.location}
            cuisine={restaurant.cuisine}
            image={restaurantImages[index]}
          />
        );
      })}
    </div>
  );
};

export default Allrestaurant;
