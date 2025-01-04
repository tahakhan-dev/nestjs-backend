import { BullQueueModule } from '../bull-queue/bull-queue.module';
import { ActivityLogEventHandler } from './event.handler';
import { WelcomeUserQueue } from './welcome-user.queue';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullQueueModule,
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    WelcomeUserQueue,
    ActivityLogEventHandler
  ],
})
export class UsersModule { }
