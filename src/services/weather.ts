   import axios from 'axios';

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  rainfall: number;
  forecast: Array<{
    date: string;
    temperature: number;
    description: string;
    rainfall: number;
  }>;
}

class WeatherService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      return {
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        rainfall: response.data.rain ? response.data.rain['1h'] || 0 : 0,
        forecast: []
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  async getForecast(latitude: number, longitude: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const forecast = response.data.list.slice(0, 5).map((item: { dt: number; main: { temp: number }; weather: Array<{ description: string }>; rain?: { '3h': number } }) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: item.main.temp,
        description: item.weather[0].description,
        rainfall: item.rain ? item.rain['3h'] || 0 : 0
      }));

      return {
        temperature: response.data.list[0].main.temp,
        humidity: response.data.list[0].main.humidity,
        description: response.data.list[0].weather[0].description,
        rainfall: response.data.list[0].rain ? response.data.list[0].rain['3h'] || 0 : 0,
        forecast
      };
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new Error('Failed to fetch forecast data');
    }
  }

  async getWeatherAlert(latitude: number, longitude: number): Promise<string | null> {
    try {
      const response = await axios.get(`${this.baseUrl}/onecall`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
          exclude: 'current,minutely,hourly,daily'
        }
      });

      if (response.data.alerts && response.data.alerts.length > 0) {
        return response.data.alerts[0].description;
      }

      return null;
    } catch (error) {
      console.error('Error fetching weather alerts:', error);
      return null;
    }
  }
}

export default WeatherService;