import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './commons/common/logger/logger.middleware';
import { loadModules } from './commons/utils/loadModules';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import * as process from 'process';
import * as redisStore from 'cache-manager-ioredis';

const dynamicModules = loadModules(__dirname + '/**/*.module{.ts,.js}').filter(
  Boolean,
);
export const cacheModule = CacheModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<CacheModuleOptions> => {
    return {
      store: redisStore,
      host: configService.get<string>('REDIS_HOST', 'localhost'), // using default value as 'localhost'
      port: configService.get<number>('REDIS_PORT', 6379), // using default value as 6379
      password: configService.get<string>('REDIS_PASSWORD'), // no default value, it should be defined in your env
      ttl: configService.get<number>('CACHE_TTL', 600), // using default value as 600 seconds
      db: configService.get<number>('REDIS_DB', 0), // using default value as 0
    };
  },
});
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DBNAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') === 'DEV',
      }),
      inject: [ConfigService],
    }),
    cacheModule,
    ...dynamicModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.NODE_ENV === 'DEV';
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
