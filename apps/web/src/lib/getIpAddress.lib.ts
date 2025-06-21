import { IPAddressApiResponse } from '@ridersafeid/types';
import axios from 'axios';
const url = process.env.NEXT_PUBLIC_GET_IP_URL || '';

export async function getIpAddress(): Promise<IPAddressApiResponse> {
    const res = await axios.get<string>(url);
    return {ip:res.data};
}
