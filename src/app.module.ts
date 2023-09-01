import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './commons/common/logger/logger.middleware';
import { UsersModule } from './modules/domains/users/users.module';
import { AgentBlocksModule } from './modules/domains/agent-blocks/agent-blocks.module';
import { TaskBlocksModule } from './modules/domains/task-blocks/task-blocks.module';
import { AuthModule } from './modules/functions/auth/auth.module';
import { ToolBlocksModule } from './modules/domains/tool-blocks/tool-blocks.module';
import { TagsModule } from './modules/domains/tags/tags.module';
import { AgentTagsModule } from './modules/domains/agent_tags/agent_tags.module';
import { UserScrapsModule } from './modules/domains/user-scraps/user-scraps.module';
import { ReviewsModule } from './modules/domains/reviews/reviews.module';
import { OrdersModule } from './modules/domains/orders/orders.module';
import { OrderDetailsModule } from './modules/domains/order-details/order-details.module';
import { PaymentsModule } from './modules/domains/payments/payments.module';
import { CyclesModule } from './modules/domains/cycles/cycles.module';
import { EmpAgentsModule } from './modules/domains/emp-agents/emp-agents.module';
import { MessagesModule } from './modules/domains/messages/messages.module';
import { RunsModule } from './modules/domains/runs/runs.module';
import { ToolsModule } from './modules/domains/tools/tools.module';
import { UserToolsModule } from './modules/domains/user-tools/user-tools.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DBNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'DEV' ? true : false,
    }),
    UsersModule,
    AgentBlocksModule,
    TaskBlocksModule,
    AuthModule,
    ToolBlocksModule,
    TagsModule,
    AgentTagsModule,
    UserScrapsModule,
    ReviewsModule,
    OrdersModule,
    OrderDetailsModule,
    PaymentsModule,
    CyclesModule,
    EmpAgentsModule,
    MessagesModule,
    RunsModule,
    ToolsModule,
    UserToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean =
    process.env.NODE_ENV === 'DEV' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
