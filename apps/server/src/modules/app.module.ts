import { Module } from '@nestjs/common';

import { AppController } from '@/controllers';
import { AuthModule } from '@/modules';
import { AppService, PrismaService } from '@/services';

@Module({
    imports: [AuthModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
    exports: [PrismaService],
})
export class AppModule {}
