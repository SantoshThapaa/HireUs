import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2, MapPin } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { SERVICES_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetServicesById from '@/hooks/useGetServicesById';

const ServicesSetup = () => {
    const params = useParams();
    useGetServicesById(params.id);
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        latitude: '',
        longitude: '',
        file: null,
    });
    const { singleServices } = useSelector((store) => store.service);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle file input changes
    // const changeFileHandler = (e) => {
    //     const file = e.target.files?.[0];
    //     setInput({ ...input, file });
    // };

    // Fetch user's location
    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setInput((prev) => ({
                        ...prev,
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6),
                    }));
                    toast.success('Location fetched successfully!');
                },
                (error) => {
                    console.error('Error fetching location:', error);
                    toast.error('Unable to fetch location. Please enter manually.');
                }
            );
        } else {
            toast.error('Geolocation is not supported by your browser.');
        }
    };

    // Form submission handler
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        formData.append('latitude', input.latitude);
        formData.append('longitude', input.longitude);
        if (input.file) {
            formData.append('file', input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${SERVICES_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/services');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    // Populate form with service data
    useEffect(() => {
        setInput({
            name: singleServices.name || '',
            description: singleServices.description || '',
            website: singleServices.website || '',
            location: singleServices.location || '',
            latitude: singleServices.latitude || '',
            longitude: singleServices.longitude || '',
            file: null,
        });
    }, [singleServices]);

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center gap-5 p-8">
                        <Button
                            onClick={() => navigate('/admin/services')}
                            variant="outline"
                            className="flex items-center gap-2 text-[#45cfc1] font-semibold"
                        >
                            <ArrowLeft className="text-[#45cfc1]" />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-xl">Services/Companies Setup</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Services/Companies Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website/Social media</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Latitude</Label>
                            <Input
                                type="number"
                                name="latitude"
                                value={input.latitude}
                                onChange={changeEventHandler}
                                placeholder="e.g., 27.7172"
                            />
                        </div>
                        <div>
                            <Label>Longitude</Label>
                            <Input
                                type="number"
                                name="longitude"
                                value={input.longitude}
                                onChange={changeEventHandler}
                                placeholder="e.g., 85.3240"
                            />
                        </div>
                        <div>
                            <Button type="button" onClick={fetchLocation} className="w-full">
                                <MapPin className="w-4 inline-block mr-2" />
                                Fetch Location
                            </Button>
                        </div>
                        {/* <div>
                            <Label>Logo</Label>
                            <Input type="file" accept="image/*" onChange={changeFileHandler} />
                        </div> */}
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 rounded-xl bg-[#45cfc1]">
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ServicesSetup;
