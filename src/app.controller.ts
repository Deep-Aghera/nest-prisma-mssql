import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client'
import { AuthGuard } from '@nestjs/passport';
const prisma = new PrismaClient()


const data = prisma.user.findMany().then(data => data);

//console.log(data.then)

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    console.log(await data)
    return this.appService.getHello();
  }


  //@UseGuards(AuthGuard('local'))
  @Get('login') 
  getLogin() {
    return "login form app"
  }
}
