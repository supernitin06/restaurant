"use client";
import React, { useEffect, useState } from "react";
import API_ENDPOINTS from "../../config/api";
import { apiHandler } from "@/config/index";
import Allrestaurant from "./Allrestaurant";

const Filter = () => {
    const [data, setData] = useState([]); // All restaurants
    const [locations, setLocations] = useState([]); // Unique locations
    const [cuisines, setCuisines] = useState([]); // Unique cuisines
    const [filteredData, setFilteredData] = useState([]); // Filtered restaurants
    const [search, setSearch] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedCuisine, setSelectedCuisine] = useState("");

    // Fetch filtered data whenever filters/search change
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await apiHandler({
                    url: `${API_ENDPOINTS.ALLRESTAURANT}?search=${search}&location=${selectedLocation}&cuisine=${selectedCuisine}`,
                    method: "GET",
                });

                if (data) {
                    setFilteredData(data.data);
                    console.log("Filtered Restaurants:", data.data);
                } else {
                    alert("No data found");
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [selectedLocation, selectedCuisine, search]);

    // Fetch all restaurants for dropdowns
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await apiHandler({
                    url: `${API_ENDPOINTS.ALLRESTAURANT}`,
                    method: "GET",
                });

                if (data) {
                    setData(data.data);

                    // Extract unique locations & cuisines
                    const uniqueLocations = [
                        ...new Set(data.data.map((item) => item.location)),
                    ];
                    const uniqueCuisines = [
                        ...new Set(data.data.map((item) => item.cuisine)),
                    ];
                    setLocations(uniqueLocations);
                    setCuisines(uniqueCuisines);

                    console.log("All Restaurants:", data.data);
                } else {
                    alert("No data found");
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 ">
            {/* Filter Bar */}
            <div className="container mx-auto border-[1px] border-gray-300 h-[100px] bg-white shadow-md rounded-2xl flex items-center justify-between px-6 mb-8">
                <div className="flex items-center space-x-6 rtl:space-x-reverse">

                    {/* Location Dropdown */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <label className="text-lg font-semibold">Filter By Location:</label>
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-52"
                        >
                            <option value="">All Locations</option>
                            {locations.map((loc, index) => (
                                <option key={index} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Cuisine Dropdown */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <label className="text-lg font-semibold">Filter By Cuisine:</label>
                        <select
                            value={selectedCuisine}
                            onChange={(e) => setSelectedCuisine(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-52"
                        >
                            <option value="">All Cuisines</option>
                            {cuisines.map((cui, index) => (
                                <option key={index} value={cui}>
                                    {cui}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                {/* Search Input */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name..."
                        className="border border-gray-300 rounded-lg p-2 w-64"
                    />
                </div>

            </div>

            {/* Restaurant Cards */}
            <div className="">
                <Allrestaurant data={filteredData} />
            </div>
        </div>
    );
};

export default Filter;
