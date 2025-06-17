import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
    async getQrData(id: string) {
        try {
            const res = await fetch(
                `${process.env.QR_SERVICE_BASE_URL}qr/${id}`,
                {
                    method: 'get',
                },
            );
            const data = await res.json();

            return data;
        } catch (_e) {
            throw new NotFoundException();
        }
    }
}
