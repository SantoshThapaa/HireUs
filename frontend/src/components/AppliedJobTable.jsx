import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { setAllAppliedJobs } from '@/redux/jobSlice';

const AppliedJobTable = () => {
  const dispatch = useDispatch();
  const { allAppliedJobs } = useSelector(store => store.job);

  // Ensure that allAppliedJobs is an array, or fallback to an empty array
  const appliedJobs = Array.isArray(allAppliedJobs) ? allAppliedJobs : [];

  // Fetch applied jobs when the component mounts
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/application/get', {
          withCredentials: true, // to include cookies for authentication
        });
        if (Array.isArray(response.data.application)) {
          dispatch(setAllAppliedJobs(response.data.application));  // Assuming response.data.application is the applied jobs list
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length <= 0 ? (
            <span>You haven`t applied for any jobs yet.</span>
          ) : (
            appliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.services?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
