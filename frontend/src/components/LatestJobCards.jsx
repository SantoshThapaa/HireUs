import PropTypes from "prop-types";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
      role="button"
      tabIndex={0}
    >
      {/* Service Name */}
      <div>
        <h1 className="font-medium text-lg">
          {job?.services?.name || t("unknownService")}
        </h1>
        <p className="text-sm text-gray-300">{t("nepal")}</p>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg my-2">
          {job?.title || t("noTitle")}
        </h1>
        <p className="text-sm text-gray-600">
          {job?.description || t("noDescription")}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-[#5fa794] font-bold" variant="ghost">
          {job?.position || 0} {t("positions")}
        </Badge>
        <Badge className="text-[#5fa794] font-bold" variant="ghost">
          {job?.jobType || t("unknownType")}
        </Badge>
        <Badge className="text-[#5fa794] font-bold" variant="ghost">
          NRs. {job?.salary || 0}k
        </Badge>
      </div>
    </div>
  );
};

// PropTypes validation for the "job" prop
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
