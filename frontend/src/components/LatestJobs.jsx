import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { useTranslation } from "react-i18next";

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#45cfc1]">{t('latest')}</span> {t('Jobs')}
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {
          allJobs.length <= 0 
            ? <span>{t('noJobsAvailable')}</span> 
            : allJobs?.slice(0, 6).map((job) => (
                <LatestJobCards key={job._id} job={job} />
            ))
        }
      </div>
    </div>
  );
};

export default LatestJobs;
