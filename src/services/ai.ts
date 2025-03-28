import WeatherService from './weather';

interface CropInfo {
  name: string;
  season: string;
  waterNeeds: string;
  growingTime: string;
  tips: string;
}

interface AIResponse {
  text: string;
  context?: {
    weather?: {
      current: {
        description: string;
        rainfall: number;
        humidity: number;
      };
      forecast: unknown;
      alert?: string;
    };
    crops?: CropInfo[];
  };
}

class AIService {
  private weatherService: WeatherService;
  private cropDatabase: Record<string, CropInfo>;

  constructor(weatherApiKey: string) {
    this.weatherService = new WeatherService(weatherApiKey);
    this.cropDatabase = {
      maize: {
        name: 'Maize',
        season: 'long-rains',
        waterNeeds: 'Medium',
        growingTime: '90-120 days',
        tips: 'Plant at the onset of rains. Space plants 75cm between rows and 30cm within rows.'
      },
      beans: {
        name: 'Beans',
        season: 'short-rains',
        waterNeeds: 'Medium',
        growingTime: '60-90 days',
        tips: 'Avoid waterlogging. Can be intercropped with maize for better yields.'
      },
      tomatoes: {
        name: 'Tomatoes',
        season: 'year-round',
        waterNeeds: 'High',
        growingTime: '90-100 days',
        tips: 'Stake plants for support. Water regularly but avoid wetting the leaves.'
      }
    };
  }

  private async getWeatherContext(latitude: number, longitude: number) {
    try {
      const [current, forecast, alert] = await Promise.all([
        this.weatherService.getCurrentWeather(latitude, longitude),
        this.weatherService.getForecast(latitude, longitude),
        this.weatherService.getWeatherAlert(latitude, longitude)
      ]);

      return { current, forecast, alert };
    } catch (error) {
      console.error('Error getting weather context:', error);
      return null;
    }
  }

  private getCropAdvice(cropName: string, weatherContext: { current: { rainfall: number; humidity: number; } }): string {
    const crop = this.cropDatabase[cropName.toLowerCase()];
    if (!crop) return '';

    const { current } = weatherContext;
    let advice = '';

    // Weather-based advice
    if (current.rainfall > 0) {
      advice += `With current rainfall, hold off on irrigation for your ${crop.name}. `;
    } else if (current.humidity < 40) {
      advice += `Consider light irrigation for your ${crop.name} due to low humidity. `;
    }

    // Season-based advice
    const currentMonth = new Date().getMonth();
    if (crop.season === 'long-rains' && (currentMonth >= 2 && currentMonth <= 4)) {
      advice += 'This is an ideal planting time during the long rains season. ';
    }

    return advice + crop.tips;
  }

  async generateResponse(userMessage: string, latitude: number, longitude: number): Promise<AIResponse> {
    const weatherContext = await this.getWeatherContext(latitude, longitude);
const response: AIResponse = { text: '' };

    // Identify crop mentions
    const mentionedCrops = Object.keys(this.cropDatabase).filter(crop =>
      userMessage.toLowerCase().includes(crop)
    );

    if (mentionedCrops.length > 0) {
      const cropName = mentionedCrops[0];
      const advice = this.getCropAdvice(cropName, weatherContext);
      response.text = advice;
      response.context = {
        weather: weatherContext,
        crops: [this.cropDatabase[cropName]]
      };
    } else if (userMessage.toLowerCase().includes('weather')) {
      response.text = `Current weather conditions: ${weatherContext?.current.description}. `;
      if (weatherContext?.alert) {
        response.text += `Weather alert: ${weatherContext.alert}`;
      }
      response.context = { weather: weatherContext };
    } else {
      response.text = 'How can I help you with your farming today? Feel free to ask about specific crops or weather conditions.';
    }

    return response;
  }
}

export default AIService;