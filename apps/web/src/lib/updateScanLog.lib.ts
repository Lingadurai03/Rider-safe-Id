import axios from 'axios';

const url = process.env.NEXT_PUBLIC_QR_SERVICE_BASE_URL;

export async function updateScanLog(
    scanLogId: string,
    updateData: { lat: number; long: number; accuracy: 'accurate' },
) {
    const res = await axios.patch(
        `${url}scan/update-log/${scanLogId}`,
        updateData,
    );
    return res.data;
}
