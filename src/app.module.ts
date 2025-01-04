import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigAppModule } from './config/config.module';
import { DatabaseModule } from './modules/database/connections/database.module';

@Module({
  imports: [
    ConfigAppModule, // Load global configurations
    DatabaseModule.forRoot({ entities: [] }),


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
