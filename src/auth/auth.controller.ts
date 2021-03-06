import { Controller, Post, Body, UnprocessableEntityException } from '@nestjs/common';
import { AuthModel } from './model/auth.model';
import { AuthService } from './auth.service';
import { UserModel } from '../user/model/user.model';
import { UserService } from '../user/user.service';
import { ValidationPipe } from '../validations/post-validation.pipe';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('/login')
    async login(@Body(new ValidationPipe()) auth: AuthModel): Promise<string> {
        return this.authService.authenticate(auth);
    }

    @Post('/register')
    async register(@Body(new ValidationPipe()) userModel: UserModel): Promise<string> {
        const emailExists = await this.userService.findByEmail(userModel.email);
        const password = userModel.password
        
        if (emailExists) {
            throw new UnprocessableEntityException('This email already exists.');
        }

        const user = await this.userService.create(userModel);

        return this.authService.authenticate({...user, password});
    }
}
