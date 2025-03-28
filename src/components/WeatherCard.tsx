
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Droplet, Wind, Thermometer } from "lucide-react";

type WeatherData = {
  temp: number;
  humidity: number;
  windSpeed: number;
  conditions: "sunny" | "cloudy" | "rainy";
  rainfall: number;
  forecast: Array<{
    day: string;
    temp: number;
    conditions: "sunny" | "cloudy" | "rainy";
  }>;
};

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to weather service
    // In a real app, you would fetch data from a weather API
    setTimeout(() => {
      const mockWeatherData: WeatherData = {
        temp: 24,
        humidity: 65,
        windSpeed: 12,
        conditions: "cloudy",
        rainfall: 0.2,
        forecast: [
          { day: "Mon", temp: 25, conditions: "sunny" },
          { day: "Tue", temp: 23, conditions: "cloudy" },
          { day: "Wed", temp: 22, conditions: "rainy" },
          { day: "Thu", temp: 24, conditions: "cloudy" },
          { day: "Fri", temp: 26, conditions: "sunny" },
        ],
      };
      
      setWeather(mockWeatherData);
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (condition: "sunny" | "cloudy" | "rainy", size = 24) => {
    switch (condition) {
      case "sunny":
        return <Sun size={size} className="text-yellow-500" />;
      case "cloudy":
        return <Cloud size={size} className="text-gray-500" />;
      case "rainy":
        return <CloudRain size={size} className="text-blue-500" />;
      default:
        return <Sun size={size} className="text-yellow-500" />;
    }
  };

  const getWeatherRecommendation = (weather: WeatherData) => {
    if (weather.conditions === "rainy") {
      return "Rainfall expected today. Consider postponing any spraying activities and ensure proper drainage in your fields.";
    } else if (weather.conditions === "sunny" && weather.temp > 25) {
      return "Hot and sunny today. Ensure adequate irrigation for your crops, especially during mid-day.";
    } else if (weather.conditions === "cloudy") {
      return "Cloudy conditions are good for transplanting seedlings. Consider this activity if planned in your schedule.";
    }
    return "Today's weather is favorable for general farming activities.";
  };

  return (
    <Card className="mt-8 border-agro-green-100">
      <CardHeader className="bg-agro-green-50 border-b border-agro-green-100 pb-2">
        <CardTitle className="text-agro-green-800 flex items-center gap-2">
          <Cloud className="h-5 w-5 text-agro-blue" />
          <span>Weather & Farming Insights</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-5">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="h-8 w-8 border-4 border-t-agro-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : weather ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-agro-blue-light bg-opacity-10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500">Today</p>
                    <h3 className="text-3xl font-bold text-agro-blue">{weather.temp}°C</h3>
                    <p className="text-agro-blue-dark capitalize">{weather.conditions}</p>
                  </div>
                  <div>
                    {getWeatherIcon(weather.conditions, 40)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 col-span-1 md:col-span-2">
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                  <Droplet className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Humidity</p>
                    <p className="font-semibold">{weather.humidity}%</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                  <Wind className="h-8 w-8 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Wind</p>
                    <p className="font-semibold">{weather.windSpeed} km/h</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                  <CloudRain className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-gray-500 text-sm">Rainfall</p>
                    <p className="font-semibold">{weather.rainfall} mm</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                  <Thermometer className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Feels Like</p>
                    <p className="font-semibold">{weather.temp + 1}°C</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-agro-green-800 mb-3">5-Day Forecast</h3>
              <div className="grid grid-cols-5 gap-2">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="text-center">
                    <p className="text-gray-500 text-sm">{day.day}</p>
                    <div className="my-2 flex justify-center">
                      {getWeatherIcon(day.conditions, 24)}
                    </div>
                    <p className="font-medium">{day.temp}°C</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-agro-green-50 p-4 rounded-lg border border-agro-green-100">
              <h3 className="text-lg font-medium text-agro-green-800 mb-2">Farming Recommendation</h3>
              <p className="text-agro-green-700">{getWeatherRecommendation(weather)}</p>
            </div>
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">Unable to load weather data</p>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
