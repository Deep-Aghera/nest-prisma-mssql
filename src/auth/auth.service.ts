import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(private readonly jwtService : JwtService) {}

    registerUser(userData) {
        console.log(userData);
        console.log(this.jwtService.sign({id : "helo"}))
        return "user registered"
    }

    async validateUser(userData : any) {
        const {email , password} = userData;
        const user = await prisma.user.findUnique({where : {email : email}})
        //console.log("here usere form prisma",user);
        if(!user) {
            throw new UnauthorizedException('Invalid Email or Password');
        }
        const passMatch = await bcrypt.compare(password,user.password);
        if(!passMatch) {
            throw new UnauthorizedException('Invalid Email or Password');
        }
        
        console.log("here is login user",user);
        let token = this.jwtService.sign({ id : user.id.toString()},);
        //console.log(token)
        return { token };
    }

    async register(registerData) {
        console.log(registerData)
        const {name , email, password } = registerData;
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltOrRounds)
        registerData.password = hashedPassword;
        let user = await prisma.user.create({
            data: registerData,
          })
          console.log(user.id.toString());
         let token = this.jwtService.sign({ id : user.id.toString()},);
         console.log(token)
         return { token };
        
    }

}
