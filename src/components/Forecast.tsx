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

    console.log("forecast", data)

    function capitalizeFirstLetter(str: string): string {
        if (str.length === 0) {
            return str;
          }
          return str[0].toUpperCase() + str.slice(1);
    }

    return (
        <div className="flex flex-col gap-6 h-full">
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

            <section className="flex pb-2 gap-2">
                {data.list.map((item, i) => (
                    <ForecastItem 
                        key={i}
                        item={item}
                        index={i}
                    />
                ))}
            </section>

            <section>
                <TemperatureChart chartData={chartData}/>
            </section>
        </div>
    )
}

export default Forecast
