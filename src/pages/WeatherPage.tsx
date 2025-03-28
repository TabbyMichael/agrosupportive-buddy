import { useEffect, useState } from 'react';
import WeatherAPIService from '@/services/weatherAPI';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from '@/hooks/use-toast';

interface WeatherState {
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    precip_mm: number;
    condition: {
      text: string;
      icon: string;
    };
    uv: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        chance_of_rain: number;
      }>;
    }>;
  };
  agriculturalInsights: {
    condition: string;
    recommendation: string;
    risk_level: 'low' | 'medium' | 'high';
    actions: string[];
  };
}

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        // For demo purposes, using fixed coordinates
        // In production, you would get user's location
        const weatherService = new WeatherAPIService(import.meta.env.VITE_OPENWEATHER_API_KEY);
        const data = await weatherService.getWeatherData(51.5074, -0.1278);
        const insights = weatherService.getAgriculturalInsights(data);

        setWeatherData({
          ...data,
          agriculturalInsights: insights
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Weather Data</h2>
        <p className="text-gray-600">{error || 'Unable to load weather information'}</p>
      </div>
    );
  }

  const { current, forecast, agriculturalInsights } = weatherData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-agro-blue mb-8">Weather & Agricultural Insights</h1>
      
      {/* Current Weather */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Current Conditions</h2>
            <div className="flex items-center mb-4">
              <img 
                src={current.condition.icon} 
                alt={current.condition.text}
                className="w-16 h-16 mr-4"
              />
              <div>
                <p className="text-4xl font-bold">{current.temp_c}°C</p>
                <p className="text-gray-600">{current.condition.text}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Feels Like</p>
                <p className="font-semibold">{current.feelslike_c}°C</p>
              </div>
              <div>
                <p className="text-gray-600">Humidity</p>
                <p className="font-semibold">{current.humidity}%</p>
              </div>
              <div>
                <p className="text-gray-600">Wind Speed</p>
                <p className="font-semibold">{current.wind_kph} km/h</p>
              </div>
              <div>
                <p className="text-gray-600">Precipitation</p>
                <p className="font-semibold">{current.precip_mm} mm</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Agricultural Advisory</h2>
            <div className={`p-4 rounded-lg ${
              agriculturalInsights.risk_level === 'high' ? 'bg-red-100' :
              agriculturalInsights.risk_level === 'medium' ? 'bg-yellow-100' :
              'bg-green-100'
            }`}>
              <p className="font-semibold mb-2">{agriculturalInsights.recommendation}</p>
              <ul className="list-disc list-inside space-y-2">
                {agriculturalInsights.actions.map((action, index) => (
                  <li key={index} className="text-gray-700">{action}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">7-Day Forecast</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.forecastday.map((day) => (
            <div key={day.date} className="text-center p-4 rounded-lg bg-gray-50">
              <p className="font-semibold mb-2">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <img 
                src={day.day.condition.icon} 
                alt={day.day.condition.text}
                className="w-12 h-12 mx-auto mb-2"
              />
              <p className="text-sm text-gray-600">{day.day.condition.text}</p>
              <div className="flex justify-center space-x-2 mt-2">
                <span className="font-semibold">{Math.round(day.day.maxtemp_c)}°</span>
                <span className="text-gray-500">{Math.round(day.day.mintemp_c)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;