import { Strategy } from "passport-local";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



@Injectable() 
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService : AuthService) {
        super();
    }
    async validateUser(userData : any) {
        console.log("i am called");
        const {email , password} = userData;
        console.log(email)
        const user = await prisma.user.findUnique({where : {email : email}})
        //console.log("here usere form prisma",user);
        if(!user) {
            throw new UnauthorizedException('Invalid Email or Password');
        }
        

        return user;
    }
}