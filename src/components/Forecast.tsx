import { forecastType } from "../types"

interface ForecastProps {
    data: forecastType
}

const Degree = ({ temp }: { temp: number } ) => (
    <span>
        {temp}
        <sup>o</sup>
    </span>
)

const Forecast = ({ data }: ForecastProps) => {
    const today = data.list[0]

    return (
        <div>
            <section className="text-center">
                <h2 className="text-2xl font-black">
                    {data.name}
                    <span className="font-thin"> {data.country}</span>
                </h2>
                <h1 className="text-4xl font-extrabold">
                    <Degree temp={Math.round(today.main.temp)}/>
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

            <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
                {data.list.map((item, i) => (
                    <div key={i} className="inline-block text-center w-[50px] flex-shrink-0">
                        <p>{i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}</p>
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
        </div>
    )
}

export default Forecast
