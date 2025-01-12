import PropTypes from "prop-types";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

// Use default parameters for `job`
const LatestJobCards = ({ job = {} }) => { 
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
      role="button"
      tabIndex={0}
    >
      <div>
        <h1 className="font-medium text-lg">{job?.services?.name || "Unknown Service"}</h1>
        <p className="text-sm text-gray-300">Nepal</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title || "No Title"}</h1>
        <p className="text-sm text-gray-600">{job?.description || "No description available."}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-[#5fa794] font-bold" variant="ghost">
          {job?.position || 0} Positions
        </Badge>
        <Badge className="text-[#5fa794] font-bold" variant="ghost">
          {job?.jobType || "Unknown Type"}
        </Badge>
        <Badge className="text-[#5fa794] font-bold" variant="ghost">
          NRs.{job?.salary || 0}k
        </Badge>
      </div>
    </div>
  );
};

// Add PropTypes validation
LatestJobCards.propTypes = {
  job: PropTypes.shape({
    services: PropTypes.shape({
      name: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.number,
    jobType: PropTypes.string,
    salary: PropTypes.number,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default LatestJobCards;
