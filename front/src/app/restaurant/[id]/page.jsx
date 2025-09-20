"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiHandler } from "@/config/index";
import API_ENDPOINTS from "@/config/api";

// Icons
import {
  Utensils,
  MapPin,
  CookingPot,
  ClipboardList,
  CalendarRange,
  IndianRupee,
  Hash,
  Clock,
  TrendingUp,
} from "lucide-react";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("orders");
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  // New states for extra stats
  const [avgOrderCost, setAvgOrderCost] = useState(null);
  const [peakHour, setPeakHour] = useState(null);

  // Fetch restaurant + stats
  useEffect(() => {
    const fetchRestaurantAndStats = async () => {
      try {
        setLoading(true);

        // Restaurant details
        const { data: rest } = await apiHandler({
          url: `${API_ENDPOINTS.ALLRESTAURANT}/${id}`,
          method: "GET",
        });
        setRestaurant(rest);

        // Avg order cost
        const { data: avgData } = await apiHandler({
          url: `${API_ENDPOINTS.ORDERCOUNT}/${id}/orderscount?avg=1`,
          method: "GET",
        });
        setAvgOrderCost(avgData?.groups?.[0]?.total_revenur ?? null);

        // Peak hours
        const { data: peakData } = await apiHandler({
          url: `${API_ENDPOINTS.ORDERCOUNT}/${id}/orderscount?peakhours=1`,
          method: "GET",
        });
        setPeakHour(peakData?.groups?.[0] ?? null);
      } catch (error) {
        console.error("Error fetching restaurant/stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRestaurantAndStats();
  }, [id]);

  // Fetch data by tab
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (activeTab === "orders") {
          url = `${API_ENDPOINTS.RESTAURANT}/${id}/orders`;
        } else if (activeTab === "revenue") {
          url = `${API_ENDPOINTS.ORDERCOUNT}/${id}/orderscount?revenue=1`;
        } else if (activeTab === "dateRange") {
          url = `${API_ENDPOINTS.RESTAURANT}/${id}/orders?start_date=${dateRange.from}&end_date=${dateRange.to}`;
        } else if (activeTab === "orderCount") {
          url = `${API_ENDPOINTS.ORDERCOUNT}/${id}/orderscount?count=1`;
        }

        if (url) {
          const { data } = await apiHandler({ url, method: "GET" });
          setData(data.orders || data.groups || []);
        }
      } catch (error) {
        console.error("Error fetching tab data:", error);
      }
    };

    if (id) fetchData();
  }, [activeTab, dateRange, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">Restaurant not found</div>
      </div>
    );
  }

  const formatHour = (hour) => {
  if (hour === null || hour === undefined) return "N/A";
  const h = parseInt(hour, 10);
  const period = h >= 12 ? "PM" : "AM";
  const formattedHour = h % 12 === 0 ? 12 : h % 12;
  return `${formattedHour}:00 ${period}`;
};


  const formatToIST = (datetimeStr) => {
    if (!datetimeStr) return "";
    const dateObj = new Date(datetimeStr.replace(" ", "T") + "Z");
    return dateObj.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const isDateField = (key) => {
    const dateFields = ["created_at", "updated_at", "order_time"];
    return dateFields.includes(key);
  };

  return (
    <div className="container mx-auto mt-18 p-6">
      {/* Restaurant Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 flex gap-6 hover:shadow-2xl transition">
        {/* Left Image */}
        <div className="w-1/2">
          <img
            src={"/1.jpg"}
            alt={restaurant.name}
            className="w-full h-72 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right Details */}
        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
            <Utensils className="w-7 h-7 text-blue-600" />
            {restaurant.name}
          </h1>

          <p className="text-gray-600 flex items-center gap-2">
            <Hash className="w-5 h-5 text-gray-500" /> <strong>ID:</strong>{" "}
            {restaurant.id}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />{" "}
            <strong>Location:</strong> {restaurant.location}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <CookingPot className="w-5 h-5 text-green-500" />{" "}
            <strong>Cuisine:</strong> {restaurant.cuisine}
          </p>

          {/* Extra stats */}
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span>
                <strong>Avg Order:</strong>{" "}
                {avgOrderCost ? `₹${avgOrderCost}` : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-orange-500" />
              <span>
                <strong>Peak Hour:</strong>{" "}
                {peakHour
                  ? `${formatHour(peakHour.order_hour)}:00 (${peakHour.total_orders} orders)`
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Action Tabs */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium shadow-md transition ${
                activeTab === "orders"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ClipboardList className="w-5 h-5" /> Orders
            </button>

            <button
              onClick={() => setActiveTab("dateRange")}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium shadow-md transition ${
                activeTab === "dateRange"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <CalendarRange className="w-5 h-5" /> Date Range
            </button>

            <button
              onClick={() => setActiveTab("revenue")}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium shadow-md transition ${
                activeTab === "revenue"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <IndianRupee className="w-5 h-5" /> Revenue
            </button>

            <button
              onClick={() => setActiveTab("orderCount")}
              className={`px-4 py-2 flex items-center gap-2 rounded-lg font-medium shadow-md transition ${
                activeTab === "orderCount"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Hash className="w-5 h-5" /> Order Count
            </button>
          </div>

          {/* Date Range Filter */}
          {activeTab === "dateRange" && (
            <div className="flex gap-3 mt-4">
              <input
                type="date"
                className="border p-2 rounded-lg shadow-sm"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, from: e.target.value }))
                }
              />
              <input
                type="date"
                min={dateRange.from}
                className="border p-2 rounded-lg shadow-sm"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, to: e.target.value }))
                }
              />
              <button
                onClick={() => setActiveTab("dateRange")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Fetch
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-8 bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 capitalize">
          {activeTab} Data
        </h2>
        {data?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  {Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      className="border border-gray-300 p-3 text-left font-semibold"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition border-b">
                    {Object.entries(row).map(([key, val], j) => (
                      <td key={j} className="border border-gray-300 p-3">
                        {isDateField(key) ? formatToIST(val) : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">No data available</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
