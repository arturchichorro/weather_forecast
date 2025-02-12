import { days } from '@/lib/utils';
import { forecastListElementType } from '../types/index';
import { Degree } from './Degree';

interface ForecastItemProps {
  item: forecastListElementType;
  index: number;
  className?: string;
}

const ForecastItem = ({ item, index, className }: ForecastItemProps) => {
  return (
    <div className={`p-2 flex text-center justify-center items-center flex-col border-2 border-slate-600 bg-slate-600/30 rounded-lg ${className}`}>
      <p className="font-bold">{index === 0 ? 'Now' : days[new Date(item.dt * 1000).getDay()]}</p>
      <img 
        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={`weather-icon-${item.weather[0].description}`}
      />
      <div className="flex gap-1 text-sm">
        <span className="text-slate-950">
          H: <Degree temp={Math.round(item.main.temp_max)} />
        </span>
        <span className="text-slate-600">
          L: <Degree temp={Math.round(item.main.temp_min)} />
        </span>
      </div>
    </div>
  );
};

export default ForecastItem;