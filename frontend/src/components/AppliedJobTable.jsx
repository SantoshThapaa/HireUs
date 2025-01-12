import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { setAllAppliedJobs } from '../redux/jobSlice' // Import the action

const AppliedJobTable = () => {
  const dispatch = useDispatch()
  const { allAppliedJobs = [] } = useSelector(store => store.job)

  // Fetch the applied jobs when the component mounts
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get('/api/appliedJobs') // Adjust the endpoint as needed
        dispatch(setAllAppliedJobs(response.data)) // Dispatch the action to set the applied jobs in Redux store
      } catch (error) {
        console.error('Error fetching applied jobs:', error)
      }
    }
    fetchAppliedJobs()
  }, [dispatch]) // Ensure the effect runs only once when the component mounts

  // Ensure allAppliedJobs is always an array
  const appliedJobs = Array.isArray(allAppliedJobs) ? allAppliedJobs : [];

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
          {appliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven’t applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            appliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell>{appliedJob?.job?.title || "N/A"}</TableCell>
                <TableCell>{appliedJob?.job?.services?.name || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Badge className={
                    appliedJob?.status === "rejected"
                      ? 'bg-red-400'
                      : appliedJob?.status === 'pending'
                        ? 'bg-gray-400'
                        : 'bg-green-400'
                  }>
                    {appliedJob?.status?.toUpperCase() || "N/A"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
