import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';

const ServicesTable = () => {
    const { services = [], searchServicesByText } = useSelector(store => store.service); // Default to empty array if services is undefined
    const [filterServices, setFilterServices] = useState(services);
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure services is an array before accessing .length
        if (Array.isArray(services)) {
            const filteredServices = services.filter((service) => {
                if (!searchServicesByText) {
                    return true;
                }
                return service?.name?.toLowerCase().includes(searchServicesByText.toLowerCase());
            });

            // Only update filterServices if the filtered result has changed
            if (JSON.stringify(filteredServices) !== JSON.stringify(filterServices)) {
                setFilterServices(filteredServices);
            }
        }
    }, [services, searchServicesByText, filterServices]);

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
                    {filterServices?.map((service) => (
                        <TableRow key={service._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={service.logo} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{service.name}</TableCell>
                            <TableCell>{service.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div
                                            onClick={() => navigate(`/admin/services/${service._id}`)}
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
};

export default ServicesTable;
