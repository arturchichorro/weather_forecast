import { forecastType } from "../types"
import { Degree } from "./Degree"
import ForecastItem from "./ForecastItem";
import { TemperatureChart } from "./LineChart";
import { days } from "@/lib/utils";

interface ForecastProps {
    data: forecastType,
    units: "metric" | "imperial"
}

const Forecast = ({ data, units }: ForecastProps) => {
    const today = data.list[0]
    const chartData = data.list.map(data => ({
        day: days[new Date(data.dt * 1000).getDay()],
        temperature: data.main.temp
    }));

    function capitalizeFirstLetter(str: string): string {
        if (str.length === 0) {
            return str;
          }
          return str[0].toUpperCase() + str.slice(1);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-6 max-w-[100%]">
            <section className="text-center">
                <h2 className="text-2xl font-black">
                    {data.city.name}
                    <span className="font-thin"> {data.city.country}</span>
                </h2>
                <h1 className="text-4xl font-extrabold">
                    <Degree temp={Math.round(today.main.temp)}/>{units === "metric" ? "C" : "F"}
                </h1>
                <p className="text-sm">
                    {capitalizeFirstLetter(today.weather[0].description)}
                </p>
                <p className="text-sm">
                    H: <Degree temp={Math.ceil(today.main.temp_max)} />
                    <span> - </span> 
                    L: <Degree temp={Math.floor(today.main.temp_min)} />
                </p>
            </section>

            <section>
                <ul className="flex flex-row gap-4 overflow-y-auto">
                    {data.list.map((item, i) => (
                        <li key={i} className="min-w-[100px] py-4 flex flex-col gap-2 text-center justify-center items-center border-2 border-stone-900 bg-slate-400/5 rounded-lg">
                            <ForecastItem 
                                item={item}
                                index={i}
                            />
                        </li>
                    ))}
                </ul>
            </section>
            <section className="w-[80%]">
                <TemperatureChart chartData={chartData}/>
            </section>
        </div>
    )
}

export default Forecast
