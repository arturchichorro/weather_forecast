import { ChangeEvent, useEffect, useState } from "react";
import { forecastType, optionType } from "../types";

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

const useForecast = () => {
    const [term, setTerm] = useState<string>('');
    const [options, setOptions] = useState<[]>([]);
    const [city, setCity] = useState<optionType | null>(null);
    const [forecast, setForecast] = useState<forecastType | null>(null);

    const getSearchOptions = (value: string) => {
        fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${WEATHER_API_KEY}`
        )
        .then(res => res.json())
        .then(data => setOptions(data))
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setTerm(value)
        if (value === '') return

        getSearchOptions(value)
    }

    const onSubmit = () => {
        if (!city) return
        getForecast(city);
    }

    const getForecast = (city: optionType) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${WEATHER_API_KEY}`
        )
        .then(res => res.json())
        .then(data => {
            const forecastData = {
                ...data.city,
                list: data.list.slice(0, 16),
            }

            setForecast(forecastData)
        })
    }

    const onOptionSelect = (option: optionType) => {
        setCity(option)
    }

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
        onInputChange, 
        onOptionSelect, 
        onSubmit 
    }
}

export default useForecast;