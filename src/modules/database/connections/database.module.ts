import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigDatabaseModule } from "src/config/database-config/db-config.module";
import { ConfigService } from "src/config/database-config/db-config.service";
import { DbConfigError } from "./db.error";
import { ConfigDBData } from "src/config/database-config/db-config.interface";
import { DataSourceOptions } from "typeorm";
import { DbConfig } from "./db.interface";

@Module({})
export class DatabaseModule {
    static forRoot(dbconfig: DbConfig): DynamicModule {
        try {
            return {
                global: true,
                module: DatabaseModule,
                imports: [
                    TypeOrmModule.forRootAsync({
                        imports: [ConfigDatabaseModule],
                        useFactory: (
                            configService: ConfigService,
                        ) =>
                            DatabaseModule.getConnectionOptions(
                                configService,
                                dbconfig,
                            ),
                        inject: [ConfigService,],
                    }),
                ],
            };
        } catch (error) {
            console.error(error, '========DatabaseModule forRoot Function========');
        }
    }

    public static getConnectionOptions(
        config: ConfigService,
        dbconfig: DbConfig,
    ): TypeOrmModuleOptions {
        try {
            const dbdata = config?.getConfig()?.db;

            if (!dbdata) {
                throw new DbConfigError('Database config is missing');
            }

            const connectionOptions = this.getConnectionOptionsDatabase(dbdata);

            return {
                ...connectionOptions,
                entities: dbconfig?.entities,
                autoLoadEntities: dbdata.autoLoadEntities,
                logging: true,
            };
        } catch (error) {
            console.error(error, '========DatabaseModule getConnectionOptions Function========');
        }
    }

    private static getConnectionOptionsDatabase(dbdata: ConfigDBData): DataSourceOptions {
        try {
            return {
                type: dbdata.type,
                host: dbdata.host,
                port: dbdata.port,
                username: dbdata.user,
                password: dbdata.pass,
                database: dbdata.name,
                synchronize: dbdata.synchronize,
                poolSize: dbdata.poolSize,
            };
        } catch (error) {
            console.error(error, '========DatabaseModule getConnectionOptionsDatabase Function========');
        }
    }
}
