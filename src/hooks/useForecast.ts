import { ChangeEvent, useEffect, useState } from "react";
import { forecastType, optionType } from "../types";

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

const useForecast = () => {
    const [term, setTerm] = useState<string>('');
    const [options, setOptions] = useState<[]>([]);
    const [city, setCity] = useState<optionType | null>(null);
    const [forecast, setForecast] = useState<{ metric: forecastType, imperial: forecastType } | null>(null);
    const [units, setUnits] = useState<"metric" | "imperial">("metric");

    const getSearchOptions = (value: string) => {
        fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${WEATHER_API_KEY}`
        )
        .then(res => res.json())
        .then(data => setOptions(data))
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTerm(value)
        if (value === '') return

        getSearchOptions(value)
    }

    const onSubmit = () => {
        if (!city) return
        getForecast(city);
    }


    const getForecast = async (city: optionType) => {
        try {
            const [metricRes, imperialRes] = await Promise.all([
                fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${WEATHER_API_KEY}`
                ),
                fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=${WEATHER_API_KEY}`
                )
            ])

            const metricData = await metricRes.json();
            const imperialData = await imperialRes.json();

            const metricforecastData = {
                ...metricData.city,
                list: metricData.list.filter((_: forecastType, index: number) => index % 8 === 0).slice(0, 5),
            }
            const imperialForecastData = {
                ...imperialData.city,
                list: imperialData.list.filter((_: forecastType, index: number) => index % 8 === 0).slice(0, 5),
            }

            setForecast({
                metric: metricforecastData,
                imperial: imperialForecastData
            })
        } catch (error) {
            console.error('Error fetching forecast:', error)
        }
    }

    const onOptionSelect = (option: optionType) => {
        setCity(option)
    }

    const onBack = () => {
        setForecast(null)
        setOptions([])
        setTerm("")
        setCity(null)
    }

    const onUnitsChange = () => {
        setUnits(prevUnits => prevUnits === "metric" ? "imperial" : "metric");
    };

    useEffect(() => {
        if (city) {
            setTerm(city.name)
            setOptions([])
        }
    }, [city])

    return { 
        term, 
        options, 
        forecast,
        units,
        onInputChange, 
        onOptionSelect, 
        onSubmit,
        onBack,
        onUnitsChange
    }
}

export default useForecast;