import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Syangja"],
    },
    {
        fitlerType: "Jobs",
        array: [
            "babySitterService",
            "nurseMidwife",
            "officeMaidService",
            "mentalHealthNurse",
            "oncologyNurse",
            "houseMaid",
            "caretaker",
        ],
    },
    {
        fitlerType: "Salary",
        array: ["0-10k", "10-25k", "25-40k", "40-75k", "75-1lakh"],
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="font-bold text-lg text-[#45cfc1]">Filter Jobs</h1>
            <hr className="mt-3" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {fitlerData.map((data, index) => (
                    <div key={index}>
                        <h1 className="font-bold text-lg">{data.fitlerType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={itemId} className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem value={item} id={itemId} checked={selectedValue === item} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
