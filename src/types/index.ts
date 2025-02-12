export type optionType = {
    name: string,
    lat: number,
    lon: number
}

export type forecastType = {
    city: {
        name: string
        country: string
    }
    list: forecastListElementType[],
}

export type forecastListElementType = {
    dt: number
        main: {
            feels_like: number
            temp: number
            temp_max: number
            temp_min: number
        },
        weather: [{
            main: string
            icon: string
            description: string
        }]
}

export type chartDataElementType = {
    day: string
    temperature: number
}