import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsGateway } from 'src/websocket/notifications/notifications.gateway';

@Module({
  imports: [AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService, JwtService, PrismaService, NotificationsGateway],
})
export class ProductsModule {}
