import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports : [PassportModule,JwtModule.register({
    secret: "temp",
    signOptions: { expiresIn: '60s' },
  }),],
  providers: [AuthService,LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
