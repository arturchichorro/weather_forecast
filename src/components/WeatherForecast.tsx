import useForecast from "../hooks/useForecast";
import Forecast from "./Forecast";
import Search from "./Search";

const WeatherForecast = () => {
    const { 
        term, 
        options, 
        forecast, 
        onInputChange, 
        onOptionSelect, 
        onSubmit 
    } = useForecast()

    return (
        <div className="h-fit w-full bg-slate-200 rounded-4xl p-10 text-slate-900">
            {forecast ? (
                <Forecast data={forecast} />
            ) : (
                <Search
                    term={term}
                    options={options}
                    onInputChange={onInputChange}
                    onOptionSelect={onOptionSelect}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    )
}

export default WeatherForecast
