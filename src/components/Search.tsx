import { ChangeEvent } from "react";
import { optionType } from "../types";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface SearchProps {
    term: string
    options: []
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
    onOptionSelect: (option: optionType) => void
    onSubmit: () => void
}

const Search = ({ term, options, onInputChange, onOptionSelect, onSubmit }: SearchProps) => {

    return (
        <div className="flex flex-col items-center gap-8">
            <h1 className="text-4xl font-bold text-center">Weather Forecast</h1>
            <div className="text-lg relative flex items-center gap-3 flex-row">
                <Input 
                    type="text"
                    value={term}
                    onChange={onInputChange}
                    className="rounded-md border-slate-600 px-2"
                    placeholder="Search for a city..."
                />
                <ul className="absolute top-7 ml-1 rounded-b-md min-w-32 bg-slate-100">
                    {options.map((option: optionType, index: number) => (
                        <li key={option.name + '-' + index}>
                            <button
                                className="text-left w-full hover:bg-slate-300"
                                onClick={() => onOptionSelect(option)}
                            >
                                {option.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <Button
                    className="text-lg px-2 max-w-[80px]"
                    onClick={onSubmit}
                >
                    Search
                </Button>
            </div>
        </div>
    )
}

export default Search
