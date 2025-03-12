import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { NotificationsGateway } from './websocket/notifications/notifications.gateway';
import { NotificationsModule } from './websocket/notifications/notifications.module';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, NotificationsGateway],
})
export class AppModule {}
