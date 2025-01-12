import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const FilterCard = ({ setFilterJobs }) => {
    const { allJobs } = useSelector((store) => store.job);
    const [filters, setFilters] = useState({
        location: '',
        jobType: '',
        salary: '',
    });

    // Handler for radio group value change
    const changeHandler = (type, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: value,
        }));
    };

    // Apply filters to jobs based on selected values
    useEffect(() => {
        let filteredJobs = allJobs;

        if (filters.location) {
            filteredJobs = filteredJobs.filter((job) =>
                job.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }
        if (filters.jobType) {
            filteredJobs = filteredJobs.filter((job) =>
                job.jobType.toLowerCase().includes(filters.jobType.toLowerCase())
            );
        }
        if (filters.salary) {
            filteredJobs = filteredJobs.filter((job) => {
                const salaryRange = filters.salary.split('-');
                const minSalary = parseInt(salaryRange[0], 10);
                const maxSalary = salaryRange[1] ? parseInt(salaryRange[1], 10) : Infinity;
                return job.salary >= minSalary && job.salary <= maxSalary;
            });
        }

        // Update the parent component with filtered jobs
        setFilterJobs(filteredJobs);
    }, [filters, allJobs, setFilterJobs]);

    return (
        <div className="w-full bg-white p-4 rounded-md">
            <h1 className="font-semibold text-[#45cfc1] text-xl mb-4">Filter Jobs</h1>
            <hr className="my-3" />

            {/* Location Filter */}
            <RadioGroup value={filters.location} onValueChange={(value) => changeHandler('location', value)}>
                <h2 className="font-semibold text-sm text-gray-600">Location</h2>
                <div className="flex flex-col gap-y-3 mt-2">
                    {["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Syangja"].map((location) => (
                        <div key={location} className="flex items-center space-x-1">
                            <RadioGroupItem value={location} id={`location-${location}`} checked={filters.location === location} />
                            <Label htmlFor={`location-${location}`} className="text-sm">{location}</Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>

            {/* Job Type Filter */}
            <RadioGroup value={filters.jobType} onValueChange={(value) => changeHandler('jobType', value)}>
                <h2 className="font-semibold text-sm text-gray-600 mt-5">Job Type</h2>
                <div className="flex flex-col gap-y-3 mt-2">
                    {[
                        "babySitterService",
                        "nurseMidwife",
                        "officeMaidService",
                        "mentalHealthNurse",
                        "oncologyNurse",
                        "houseMaid",
                        "caretaker",
                    ].map((jobType) => (
                        <div key={jobType} className="flex items-center space-x-1">
                            <RadioGroupItem value={jobType} id={`jobType-${jobType}`} checked={filters.jobType === jobType} />
                            <Label htmlFor={`jobType-${jobType}`} className="text-sm">{jobType}</Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>

            {/* Salary Filter */}
            <RadioGroup value={filters.salary} onValueChange={(value) => changeHandler('salary', value)}>
                <h2 className="font-semibold text-sm text-gray-600 mt-5">Salary</h2>
                <div className="flex flex-col gap-y-3 mt-2">
                    {["0-10k", "10-25k", "25-40k", "40-75k", "75-1lakh"].map((salary) => (
                        <div key={salary} className="flex items-center space-x-1">
                            <RadioGroupItem value={salary} id={`salary-${salary}`} checked={filters.salary === salary} />
                            <Label htmlFor={`salary-${salary}`} className="text-sm">{salary}</Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
};

FilterCard.propTypes = {
    setFilterJobs: PropTypes.func.isRequired,
};

export default FilterCard;
