import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';

const ServicesTable = () => {
    const { services, searchServicesByText } = useSelector((store) => store.service);
    const [filterServices, setFilterServices] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const filteredServices = services.length >= 0 && services.filter((services) => {
            if (!searchServicesByText) {
                return true
            };
            return services?.name?.toLowerCase().includes(searchServicesByText.toLowerCase());
        });
        setFilterServices(filteredServices);
    }, [services, searchServicesByText]);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered services</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterServices?.map((services) => (
                        <TableRow key={services._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={services.logo} alt="Test Logo" />
                                </Avatar>

                            </TableCell>
                            <TableCell>{services.name}</TableCell>
                            <TableCell>{services.createdAt?.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div
                                            onClick={() => navigate(`/admin/services/${services._id}`)}
                                            className="flex items-center gap-2 w-fit cursor-pointer"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </div>
    );
}

export default ServicesTable;
