import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullQueueService } from './bull-queue.service';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        ConfigModule,
        BullModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                connection: {
                    host: configService.get<string>('redis.host'),
                    port: configService.get<number>('redis.port'),
                },
            }),
            inject: [ConfigService],
        }),
        BullModule.registerQueue({
            name: 'welcome-user',
        }),
    ],
    providers: [BullQueueService],
    exports: [BullQueueService],
})
export class BullQueueModule { }
