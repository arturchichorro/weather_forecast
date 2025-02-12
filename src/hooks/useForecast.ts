import { ChangeEvent, useEffect, useState } from "react";
import { forecastListElementType, forecastType, optionType } from "../types";

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY

function transformForecast(data: forecastType): forecastType {
    const groupedByDay: { [key: number]: forecastListElementType[] } = {}

    data.list.forEach(item => {
        const day = new Date(item.dt * 1000).getDay();
        if(!groupedByDay[day]) {
            groupedByDay[day] = [];
        }
        groupedByDay[day].push(item);
    });

    const today = new Date().getDay();
    const daysToKeep = Array.from({ length: 5 }, (_, i) => (today + i) % 7);
    if (!(groupedByDay[today] && groupedByDay[today].length > 0)) {
        daysToKeep.shift();
        daysToKeep.push((today + 5) % 7)
    }

    const list = []
    for (let i = 0; i<daysToKeep.length; i++) {
        const day = daysToKeep[i]
        if (!groupedByDay[day]) continue

        const dailyData = groupedByDay[day];

        const temp_max = Math.max(...dailyData.map(item => item.main.temp_max))
        const temp_min = Math.min(...dailyData.map(item => item.main.temp_min))

        let selectedItem = dailyData.find(item => new Date(item.dt * 1000).getHours() === 12);
        if (!selectedItem) {
            selectedItem = dailyData.find(item => new Date(item.dt * 1000).getHours() === 15);
        }
        if (!selectedItem) {
            selectedItem = dailyData.find(item => new Date(item.dt * 1000).getHours() === 9);
        }
        if (!selectedItem) {
            selectedItem = dailyData[0];
        }

        list.push({
            dt: selectedItem.dt,
            main: {
                feels_like: selectedItem.main.feels_like,
                temp: selectedItem.main.temp,
                temp_max,
                temp_min
            },
            weather: selectedItem.weather
        });
    }

    return {
        city: {
            name: data.city.name,
            country: data.city.country
        },
        list
    }
}

const useForecast = () => {
    const [term, setTerm] = useState<string>('');
    const [options, setOptions] = useState<[]>([]);
    const [city, setCity] = useState<optionType | null>(null);
    const [forecast, setForecast] = useState<{ metric: forecastType, imperial: forecastType } | null>(null);
    const [units, setUnits] = useState<"metric" | "imperial">("metric");

    const getSearchOptions = (value: string) => {
        fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${WEATHER_API_KEY}`
        )
        .then(res => res.json())
        .then(data => setOptions(data))
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setTerm(value)
        if (value === '') {
            setOptions([])
            return
        }

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

            const metricforecastData = transformForecast(metricData)
            const imperialForecastData = transformForecast(imperialData)

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