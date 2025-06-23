import Link from "next/link";

type LogItemProps = {
    log: {
        _id: string;
        accuracy: string;
        city: string;
        state: string;
        country: string;
        lat: string;
        long: string;
        scannedAt: string;
    };
};

const NotificationItem = ({ log }: LogItemProps) => {
    const { accuracy, city, state, country, lat, long } = log;
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;

    return (
        <div className='bg-white-xs border-white-sm backdrop-blur-sm rounded-md shadow-md p-4 hover:shadow-xl transition duration-300 flex flex-col space-y-2 justify-center items-center'>
            <h3 className='text-lg font-semibold text'>Unknown User</h3>
            <p className='text-sm text-muted'><span className='font-medium'>City:</span> {city}</p>
            <p className='text-sm text-muted'><span className='font-medium'>State:</span> {state}</p>
            <p className='text-sm text-muted'><span className='font-medium'>Country:</span> {country}</p>
            <p className={`text-sm font-medium ${accuracy === 'accurate' ? 'text-green-600' : 'text-red-600'}`}>
                Accuracy: {accuracy}
            </p>
            {accuracy === 'accurate' && (
                <Link 
                    href={mapLink}
                    target="_blank"
                    className='mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition'
                >
                    View on Google Maps
                </Link>
            )}
        </div>
    );
};

export default NotificationItem;