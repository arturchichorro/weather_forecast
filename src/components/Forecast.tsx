import { forecastType } from "../types"
import { Degree } from "./Degree"
import { TemperatureChart } from "./LineChart";

interface ForecastProps {
    data: forecastType,
    units: "metric" | "imperial"
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Forecast = ({ data, units }: ForecastProps) => {
    const today = data.list[0]
    const chartData = data.list.map(data => ({
        day: days[new Date(data.dt * 1000).getDay()],
        temperature: data.main.temp
    }));

    console.log(chartData)

    return (
        <div className="flex flex-col gap-6 h-full">
            <section className="text-center">
                <h2 className="text-2xl font-black">
                    {data.name}
                    <span className="font-thin"> {data.country}</span>
                </h2>
                <h1 className="text-4xl font-extrabold">
                    <Degree temp={Math.round(today.main.temp)}/>{units === "metric" ? "C" : "F"}
                </h1>
                <p className="text-sm">
                    {today.weather[0].main} {today.weather[0].description}
                </p>
                <p className="text-sm">
                    H: <Degree temp={Math.ceil(today.main.temp_max)} />
                    <span> - </span> 
                    L: <Degree temp={Math.floor(today.main.temp_min)} />
                </p>
            </section>

            <section className="flex pb-2 gap-10">
                {data.list.map((item, i) => (
                    <div key={i} className="flex text-center justify-center items-center w-[50px] flex-col">
                        <p>{i === 0 ? 'Now' : days[new Date(item.dt * 1000).getDay()]}</p>
                        <img 
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt = {`weather-icon-${item.weather[0].description}`}
                        />
                        <p className="text-sm font-bold">
                            <Degree temp={Math.round(item.main.temp)} />
                        </p>
                    </div>
                ))}
            </section>

            <section>
                <TemperatureChart chartData={chartData}/>
            </section>
        </div>
    )
}

export default Forecast
