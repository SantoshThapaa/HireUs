import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>List of Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            [1, 2, 3].map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>18-12-2024</TableCell>
                  <TableCell>Office Maid</TableCell>
                  <TableCell>Technergy Company</TableCell>
                  <TableCell className="text-[#5fa794] text-right"><Badge>Selected</Badge></TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
