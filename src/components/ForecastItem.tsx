import { days } from '@/lib/utils';
import { forecastListElementType } from '../types/index';
import { Degree } from './Degree';

interface ForecastItemProps {
  item: forecastListElementType;
  index: number;
}

const ForecastItem = ({ item, index }: ForecastItemProps) => {
  return (
    <>
      <p className="font-bold">{index === 0 ? 'Now' : days[new Date(item.dt * 1000).getDay()].slice(0, 3)}</p>
      <img
        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt={`weather-icon-${item.weather[0].description}`}
      />
      <div className="flex gap-1 text-md">
        <span className="text-slate-950">
          H: <Degree temp={Math.round(item.main.temp_max)} />
        </span>
        <span className="text-slate-500">
          L: <Degree temp={Math.round(item.main.temp_min)} />
        </span>
      </div>
    </>
  );
};

export default ForecastItem;