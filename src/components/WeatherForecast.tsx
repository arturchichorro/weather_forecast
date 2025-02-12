import useForecast from "../hooks/useForecast";
import Forecast from "./Forecast";
import Search from "./Search";
import { BaselineArrowBack } from "./svg/BaseLineArrow";
import Button from "./ui/Button";

const WeatherForecast = () => {
    const { 
        term, 
        options, 
        forecast,
        units,
        onInputChange, 
        onOptionSelect, 
        onSubmit,
        onBack,
        onUnitsChange
    } = useForecast()

    return (
            <div className="w-[80%] md:max-w-[60%] lg:max-w-[50%] flex flex-col justify-center">            
                <div className="flex justify-end gap-2 mx-2">
                    <Button className="my-2 py-1 px-4" onClick={onUnitsChange}>
                        <sup>o</sup>{units === "metric" ? "C" : "F"}
                    </Button>
                    <Button className="my-2 py-1 px-4" onClick={onBack} disabled={forecast ? false : true}>
                        <BaselineArrowBack />
                    </Button>
                </div>
                <div className="bg-slate-100 bg-repeat bg-[url('/pattern.svg')] border-4 border-double border-slate-600 rounded-2xl text-stone-900 flex flex-grow justify-center items-center py-8 px-2">
                    {forecast ? (
                        units === "metric" ? (
                                <Forecast data={forecast.metric} units={units} />
                            ) : (
                                <Forecast data={forecast.imperial} units={units} />
                            )
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
            </div>

    )
}

export default WeatherForecast