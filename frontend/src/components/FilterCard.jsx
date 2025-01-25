import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
// import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const FilterCard = ({ setFilterJobs, jobs }) => {
  const [filters, setFilters] = useState({
    // location: "",
    jobType: "",
    salary: "",
  });

  // Mapping for salary ranges
  const salaryMapping = {
    "0-10k": [0, 10000],
    "10-25k": [10000, 25000],
    "25-40k": [25000, 40000],
    "40-75k": [40000, 75000],
    "75-1lakh": [75000, 100000],
  };

  // Handler for updating filters
  const changeHandler = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  // Apply filters
  useEffect(() => {
    let filteredJobs = jobs;

    // if (filters.location) {
    //   filteredJobs = filteredJobs.filter((job) =>
    //     job.location.toLowerCase().includes(filters.location.toLowerCase())
    //   );
    // }

    if (filters.jobType) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobType.toLowerCase().includes(filters.jobType.toLowerCase())
      );
    }

    if (filters.salary) {
      const [minSalary, maxSalary] = salaryMapping[filters.salary] || [];
      if (minSalary !== undefined) {
        filteredJobs = filteredJobs.filter(
          (job) => job.salary >= minSalary && job.salary <= maxSalary
        );
      }
    }

    setFilterJobs(filteredJobs);
  }, [filters, jobs, setFilterJobs]);

  return (
    <div className="w-full bg-white p-4 rounded-md">
      <h1 className="font-semibold text-[#45cfc1] text-xl mb-4">Filter Jobs</h1>
      <hr className="my-3" />
      {/* Job Type Filter */}
      <RadioGroup
        value={filters.jobType}
        onValueChange={(value) => changeHandler("jobType", value)}
      >
        <h2 className="font-semibold text-sm text-gray-600 mt-5">Job Type</h2>
        <div className="flex flex-col gap-y-3 mt-2">
          {[
            "Baby Sitter Service",
            "Nurse Midwife",
            "Office Maid Service",
            "Mental Health Nurse",
            "Oncology Nurse",
            "House Maid",
            "Caretaker",
          ].map((jobType) => (
            <div key={jobType} className="flex items-center space-x-1">
              <RadioGroupItem
                value={jobType}
                id={`jobType-${jobType}`}
                checked={filters.jobType === jobType}
              />
              <Label htmlFor={`jobType-${jobType}`} className="text-sm">
                {jobType}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      {/* Salary Filter */}
      <RadioGroup
        value={filters.salary}
        onValueChange={(value) => changeHandler("salary", value)}
      >
        <h2 className="font-semibold text-sm text-gray-600 mt-5">Salary</h2>
        <div className="flex flex-col gap-y-3 mt-2">
          {["0-10k", "10-25k", "25-40k", "40-75k", "75-1lakh"].map((salary) => (
            <div key={salary} className="flex items-center space-x-1">
              <RadioGroupItem
                value={salary}
                id={`salary-${salary}`}
                checked={filters.salary === salary}
              />
              <Label htmlFor={`salary-${salary}`} className="text-sm">
                {salary}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

FilterCard.propTypes = {
  setFilterJobs: PropTypes.func.isRequired,
  jobs: PropTypes.array.isRequired,
};

export default FilterCard;
