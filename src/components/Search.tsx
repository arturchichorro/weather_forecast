import { ChangeEvent } from "react";
import { optionType } from "../types";

interface SearchProps {
    term: string
    options: []
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    onSubmit: () => void
}

const Search = ({ term, options, onInputChange, onOptionSelect, onSubmit }: SearchProps) => {

    return (
        <div className="flex flex-col items-center justify-center w-full gap-2">
            <h1 className="text-4xl font-bold">Weather Forecast</h1>
            <p className="text-sm">Search for a city...</p>
            <div className="relative flex gap-2">
                <input 
                    type="text"
                    value={term}
                    onChange={onInputChange}
                    className="rounded-md border-amber-300 border-2"
                />
                <ul className="absolute top-7 ml-1 rounded-b-md min-w-32 bg-amber-100">
                    {options.map((option: optionType, index: number) => (
                        <li key={option.name + '-' + index}>
                            <button
                                className="text-left w-full hover:bg-amber-300"
                                onClick={() => onOptionSelect(option)}
                            >
                                {option.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    className="rounded-md border-2 border-amber-300 min-w-16 cursor-pointer"
                    onClick={onSubmit}
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default Search
