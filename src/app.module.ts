import { HttpStrictTransportSecurityMiddleware } from './middleware/security/http-strict-transport-security.middleware';
import { ContentSecurityPolicyMiddleware } from './middleware/security/content-security-policy.middleware';
import { XContentTypeOptionsMiddleware } from './middleware/security/x-content-type-options.middleware';
import { LoggingFunctions } from './util/interceptor/activityLogging/activity-logging.function';
import { MiddlewareConsumer, Module, NestModule, RequestMethod, Scope } from '@nestjs/common';
import { ReferrerPolicyMiddleware } from './middleware/security/referrer-policy.middleware';
import { XssProtectionMiddleware } from './middleware/security/x-xss-protection.middleware';
import { XFrameOptionsMiddleware } from './middleware/security/x-frame-options.middleware';
import { DatabaseModule } from './modules/database/connections/database.module';
import { CompressionMiddleware } from './middleware/compression.middleware';
import { LoggingInterceptor } from './util/interceptor/logging.interceptor';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserEntity } from './modules/users/entities/user.entity';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigAppModule } from './config/config.module';
import { ShutdownService } from './shutdown.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    ConfigAppModule, // Load global configurations
    DatabaseModule.forRoot({ entities: [UserEntity] }),
    UsersModule,
    HealthModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,  // ThrottlerGuard class will be used as a guard to protect routes or endpoints in the application
    }
  ],
})
export class AppModule implements NestModule {
  /**
   * Configure Middleware
   *
   * Sets up global middleware for security headers and response compression.
   * These middlewares enhance the application's security and performance.
   *
   * @param {MiddlewareConsumer} consumer - Middleware consumer for configuring global middleware.
   */
  configure(consumer: MiddlewareConsumer) {
    /**
     * Security Middleware
     *
     * Applies various security-related headers to all routes in the application.
     * These headers help mitigate vulnerabilities such as XSS, clickjacking, and MIME type sniffing.
     */
    consumer?.apply(
      ContentSecurityPolicyMiddleware,
      HttpStrictTransportSecurityMiddleware,
      ReferrerPolicyMiddleware,
      XContentTypeOptionsMiddleware,
      XFrameOptionsMiddleware,
      XssProtectionMiddleware,
    ).forRoutes('*');
    /**
     * Compression Middleware
     *
     * Enables response compression for all routes in the application, improving performance
     * by reducing payload sizes.
     */
    consumer?.apply(CompressionMiddleware)?.forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
