import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from 'src/users/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/guards.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '120s' }, // Opcional: configura el tiempo de expiración
    }),
  ],
  providers: [AuthService, PrismaService, UsersService, JwtAuthGuard],
  controllers: [AuthController, UsersController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
