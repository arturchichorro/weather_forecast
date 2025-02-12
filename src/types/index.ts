export type optionType = {
    name: string,
    lat: number,
    lon: number
}

export type forecastType = {
    name: string,
    country: string
    list: [{
        dt: number
        main: {
            feels_like: number
            humidity: number
            pressure: number
            temp: number
            temp_max: number
            temp_min: number
        },
        weather: [{
            main: string
            icon: string
            description: string
        }]
    }]
    sunrise: number
    sunset: number
}

export type chartDataElementType = {
    day: string
    temperature: number
}