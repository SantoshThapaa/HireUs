import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, } from 'lucide-react';//MapPin 
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
// import { Button } from '../ui/button';
// import { toast } from 'sonner';

const ServicesTable = () => {
    const { services, searchServicesByText } = useSelector((store) => store.service);
    const [filterServices, setFilterServices] = useState([]);
    // const [location, setLocation] = useState({ latitude: '', longitude: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const filteredServices = services.length >= 0 && services.filter((services) => {
            if (!searchServicesByText) {
                return true;
            }
            return services?.name?.toLowerCase().includes(searchServicesByText.toLowerCase());
        });
        setFilterServices(filteredServices);
    }, [services, searchServicesByText]);

    // Fetch user's location
    // const fetchLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 setLocation({
    //                     latitude: position.coords.latitude.toFixed(6),
    //                     longitude: position.coords.longitude.toFixed(6),
    //                 });
    //                 toast.success('Location fetched successfully!');
    //             },
    //             (error) => {
    //                 console.error('Error fetching location:', error);
    //                 toast.error('Unable to fetch location. Please enter manually.');
    //             }
    //         );
    //     } else {
    //         toast.error('Geolocation is not supported by your browser.');
    //     }
    // };

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
                                <Avatar className="w-28 h-14">
                                    <AvatarImage src="/SARATHI.png" alt="Service Logo" />
                                </Avatar>
                            </TableCell>
                            <TableCell>{services.name}</TableCell>
                            <TableCell>{services.createdAt?.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48">
                                        <div
                                            onClick={() => navigate(`/admin/services/${services._id}`)}
                                            className="flex items-center gap-2 w-fit cursor-pointer mb-2"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                        {/* <div className="flex flex-col gap-2">
                                            <Button type="button" onClick={fetchLocation} className="w-full">
                                                <MapPin className="w-4 inline-block mr-2" />
                                                Fetch Location
                                            </Button>
                                            {location.latitude && location.longitude && (
                                                <div className="text-sm">
                                                    <p>Latitude: {location.latitude}</p>
                                                    <p>Longitude: {location.longitude}</p>
                                                </div>
                                            )}
                                        </div> */}
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
