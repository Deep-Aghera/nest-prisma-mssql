import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService,
                private readonly jwtService : JwtService,) {}
    @Get()
    registerUser(@Body() userData) {
        console.log("here body",userData)
        return this.authService.registerUser(userData);
    }
    @Post('/login') 
    loginUser(@Body() loginData) {
        //return "hello";
        //console.log(this.jwtService.sign({id : "hkjahkjdh"}))
        console.log(loginData)
        return this.authService.validateUser(loginData)
    }


    @Post('register')
    register(@Body() registerData) {
        console.log("register");
        return this.authService.register(registerData);
    }


}
