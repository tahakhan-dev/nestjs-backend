import { MiddlewareConsumer, Module, NestModule, RequestMethod, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigAppModule } from './config/config.module';
import { DatabaseModule } from './modules/database/connections/database.module';
import { ShutdownService } from './shutdown.service';
import { UserEntity } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { ContentSecurityPolicyMiddleware } from './middleware/security/content-security-policy.middleware';
import { HttpStrictTransportSecurityMiddleware } from './middleware/security/http-strict-transport-security.middleware';
import { ReferrerPolicyMiddleware } from './middleware/security/referrer-policy.middleware';
import { XContentTypeOptionsMiddleware } from './middleware/security/x-content-type-options.middleware';
import { XFrameOptionsMiddleware } from './middleware/security/x-frame-options.middleware';
import { XssProtectionMiddleware } from './middleware/security/x-xss-protection.middleware';
import { CompressionMiddleware } from './middleware/compression.middleware';
import { LoggingFunctions } from './util/interceptor/activityLogging/activity-logging.function';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './util/interceptor/logging.interceptor';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    ConfigAppModule, // Load global configurations
    DatabaseModule.forRoot({ entities: [UserEntity] }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ShutdownService,
    LoggingFunctions,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer?.apply(
      ContentSecurityPolicyMiddleware,
      HttpStrictTransportSecurityMiddleware,
      ReferrerPolicyMiddleware,
      XContentTypeOptionsMiddleware,
      XFrameOptionsMiddleware,
      XssProtectionMiddleware,
    ).forRoutes('*');
    consumer?.apply(CompressionMiddleware)?.forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
