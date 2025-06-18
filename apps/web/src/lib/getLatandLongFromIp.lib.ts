import { IpLocationApiResponse } from '@ridersafeid/types';
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_GET_IP_LOCATION_URL || '';
export async function getLatandLong(
    ip: string,
): Promise<IpLocationApiResponse> {
    const res = await axios.post(url, [{ query: ip }]);
    return res.data;
}
