import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

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

const NotificationItem = async ({ log }: LogItemProps) => {
    const { accuracy, city, state, country, lat, long } = log;
    const t = await getTranslations('notification');
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;

    return (
        <div className="bg-white-xs border-white-sm backdrop-blur-sm rounded-md shadow-md p-4 hover:shadow-xl transition duration-300 flex flex-col space-y-2 justify-center items-center">
            <h3 className="text-lg font-semibold text">Unknown User</h3>
            <p className="text-sm text-muted">
                <span className="font-medium">{t('city')}:</span> {city}
            </p>
            <p className="text-sm text-muted">
                <span className="font-medium">{t('state')}:</span> {state}
            </p>
            <p className="text-sm text-muted">
                <span className="font-medium">{t('country')}:</span> {country}
            </p>
            <p
                className={`text-sm font-medium ${
                    accuracy === 'accurate' ? 'text-green-600' : 'text-red-600'
                }`}
            >
                {t('accuracy')}: {accuracy}
            </p>
            {accuracy === 'accurate' && (
                <Link
                    href={mapLink}
                    target="_blank"
                    className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                    {t('viewOnGoogleMap')}
                </Link>
            )}
        </div>
    );
};

export default NotificationItem;
