import axios from 'axios';

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  precip_mm: number;
  condition: WeatherCondition;
  uv: number;
  cloud: number;
  pressure_mb: number;
}

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    totalprecip_mm: number;
    condition: WeatherCondition;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: Array<{
    time: string;
    temp_c: number;
    condition: WeatherCondition;
    chance_of_rain: number;
  }>;
}

interface WeatherData {
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
  alerts?: {
    alert: Array<{
      headline: string;
      severity: string;
      urgency: string;
      areas: string;
      desc: string;
    }>;
  };
}

interface AgriculturalInsight {
  condition: string;
  recommendation: string;
  risk_level: 'low' | 'medium' | 'high';
  actions: string[];
}

class WeatherAPIService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
          units: 'metric',
          exclude: 'minutely'
        }
      });
      
      // Transform OpenWeatherMap data to match our interface
      const current = {
        temp_c: response.data.main.temp,
        feelslike_c: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        wind_kph: response.data.wind.speed * 3.6, // Convert m/s to km/h
        precip_mm: response.data.rain ? response.data.rain['1h'] || 0 : 0,
        condition: {
          text: response.data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          code: response.data.weather[0].id
        },
        uv: 0, // UV index not available in current weather endpoint
        cloud: response.data.clouds.all,
        pressure_mb: response.data.main.pressure
      };

      // Get forecast data
      const forecastResponse = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      const forecastday = [];
      const dailyForecasts = new Map();

      // Group forecast data by day
      forecastResponse.data.list.forEach((item: OpenWeatherMapItem) => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0];
        if (!dailyForecasts.has(date)) {
          dailyForecasts.set(date, {
            temps: [],
            conditions: [],
            hourly: []
          });
        }
        const dayData = dailyForecasts.get(date) as DailyForecastData;
        dayData.temps.push(item.main.temp);
        dayData.conditions.push(item.weather[0]);
        dayData.hourly.push(item);
      });

      // Process daily forecasts
      dailyForecasts.forEach((data: DailyForecastData, date: string) => {
        if (forecastday.length >= 7) return;

        const maxTemp = Math.max(...data.temps);
        const minTemp = Math.min(...data.temps);
        const mostFrequentCondition = data.conditions.reduce((a, b) =>
          data.conditions.filter(c => c.id === a.id).length >= data.conditions.filter(c => c.id === b.id).length ? a : b
        );

        forecastday.push({
          date,
          day: {
            maxtemp_c: maxTemp,
            mintemp_c: minTemp,
            avgtemp_c: (maxTemp + minTemp) / 2,
            totalprecip_mm: data.hourly.reduce((sum: number, hour: OpenWeatherMapItem) => 
              sum + (hour.rain ? hour.rain['3h'] || 0 : 0), 0),
            condition: {
              text: mostFrequentCondition.description,
              icon: `https://openweathermap.org/img/wn/${mostFrequentCondition.icon}@2x.png`,
              code: mostFrequentCondition.id
            },
            uv: 0 // UV index not available in forecast endpoint
          },
          hour: data.hourly.map((hour: OpenWeatherMapItem) => ({
            time: new Date(hour.dt * 1000).toISOString(),
            temp_c: hour.main.temp,
            condition: {
              text: hour.weather[0].description,
              icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
              code: hour.weather[0].id
            },
            chance_of_rain: hour.pop ? hour.pop * 100 : 0
          }))
        });
      });

      return {
        current,
        forecast: { forecastday }
      };

      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  getAgriculturalInsights(weatherData: WeatherData): AgriculturalInsight {
    const current = weatherData.current;
    const forecast = weatherData.forecast.forecastday[0];
    
    const insight: AgriculturalInsight = {
      condition: current.condition.text,
      recommendation: '',
      risk_level: 'low',
      actions: []
    };

    // Temperature-based insights
    if (current.temp_c > 30) {
      insight.risk_level = 'high';
      insight.actions.push(
        'Implement shade structures for sensitive crops',
        'Increase irrigation frequency',
        'Monitor for heat stress symptoms'
      );
    } else if (current.temp_c < 10) {
      insight.risk_level = 'medium';
      insight.actions.push(
        'Protect crops from frost damage',
        'Delay sensitive crop planting',
        'Monitor soil temperature'
      );
    }

    // Rainfall and humidity insights
    if (current.precip_mm > 0) {
      insight.actions.push(
        'Postpone spraying activities',
        'Check field drainage',
        'Monitor for disease pressure'
      );
      if (current.precip_mm > 25) {
        insight.risk_level = 'high';
      }
    } else if (current.humidity > 80) {
      insight.actions.push(
        'Monitor for fungal diseases',
        'Ensure proper ventilation in greenhouses',
        'Consider preventive fungicide application'
      );
    } else if (current.humidity < 40) {
      insight.actions.push(
        'Increase irrigation',
        'Apply mulch to retain moisture',
        'Monitor for water stress'
      );
    }

    // UV and wind insights
    if (current.uv > 8) {
      insight.actions.push(
        'Protect workers during mid-day',
        'Consider shade cloth for sensitive crops'
      );
    }
    if (current.wind_kph > 40) {
      insight.risk_level = 'high';
      insight.actions.push(
        'Delay spraying operations',
        'Protect young plants',
        'Secure farm structures'
      );
    }

    // Generate main recommendation
    insight.recommendation = this.generateRecommendation(insight);

    return insight;
  }

  private generateRecommendation(insight: AgriculturalInsight): string {
    const riskLevelMsg = {
      low: 'Favorable conditions for most farming activities.',
      medium: 'Some precautions needed for farming activities.',
      high: 'High-risk conditions. Take immediate protective measures.'
    };

    return `${riskLevelMsg[insight.risk_level]} ${insight.actions[0]}.`;
  }

  async getDetailedForecast(latitude: number, longitude: number): Promise<{
    daily: ForecastDay[];
    alerts: WeatherData['alerts'];
  }> {
    const data = await this.getWeatherData(latitude, longitude);
    return {
      daily: data.forecast.forecastday,
      alerts: data.alerts
    };
  }
}

export default WeatherAPIService;


interface OpenWeatherMapItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    id: number;
    description: string;
    icon: string;
  }>;
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  pop?: number;
}

interface DailyForecastData {
  temps: number[];
  conditions: Array<{
    id: number;
    description: string;
    icon: string;
  }>;
  hourly: OpenWeatherMapItem[];
}