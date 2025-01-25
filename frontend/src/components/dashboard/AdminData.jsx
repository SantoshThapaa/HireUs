import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminData = () => {
  const [workersCount, setWorkersCount] = useState(0);
  const [recruitersCount, setRecruitersCount] = useState(0);
  const [workersDetails, setWorkersDetails] = useState([]);
  const [recruitersDetails, setRecruitersDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users and recruiters data from the backend
  useEffect(() => {
    const fetchUsersAndRecruiters = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/getadmindata');
        const { counts, workersDetails, recruitersDetails } = response.data;
        
        setWorkersCount(counts.workers);
        setRecruitersCount(counts.recruiters);
        setWorkersDetails(workersDetails);
        setRecruitersDetails(recruitersDetails);
      } catch (err) {
        setError('Failed to fetch data');
        console.log("err", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndRecruiters();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Users Count</h3>
        <p>Workers: {workersCount}</p>
        <p>Recruiters: {recruitersCount}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Workers Details</h3>
        <ul>
          {workersDetails.map(worker => (
            <li key={worker._id} className="border-b py-2">
              <p><strong>{worker.fullname}</strong></p>
              <p>{worker.email}</p>
              <p>{worker.profile.skills.join(', ')}</p>
              <p>Location: {worker.profile.location.latitude}, {worker.profile.location.longitude}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Recruiters Details</h3>
        <ul>
          {recruitersDetails.map(recruiter => (
            <li key={recruiter._id} className="border-b py-2">
              <p><strong>{recruiter.fullname}</strong></p>
              <p>{recruiter.email}</p>
              <p>{recruiter.profile.bio}</p>
              <p>Location: {recruiter.profile.location.latitude}, {recruiter.profile.location.longitude}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminData;
