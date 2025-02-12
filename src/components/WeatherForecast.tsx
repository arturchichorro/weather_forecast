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
            <>            
                <div className="flex justify-end gap-2 py-1 mx-2 sm:mx-4">
                    <Button className="my-2 px-2 text-sm" onClick={onUnitsChange}>
                        <sup>o</sup>{units === "metric" ? "C" : "F"}
                    </Button>
                    <Button className="my-2 px-2 text-sm" onClick={onBack} disabled={forecast ? false : true}>
                        <BaselineArrowBack />
                    </Button>
                </div>
                <div className="bg-slate-200 bg-repeat bg-[url('/pattern.svg')] border-4 border-double border-slate-600 rounded-2xl p-4 sm:p-6 md:p-10 text-slate-900 flex justify-center items-center min-h-[400px]">
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
            </>

    )
}

export default WeatherForecast