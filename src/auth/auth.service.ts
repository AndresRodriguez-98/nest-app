/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/model/user.schema';
import { Model } from 'mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtAuthService: JwtService
    ){}

    async register(userObject: RegisterAuthDto) {
        const { password } = userObject;
        const plainToHash = await hash(password, 10);
        userObject = {...userObject, password:plainToHash};
        return this.userModel.create(userObject)
    }

    async login(userObjectLogin: LoginAuthDto) {
        const { email, password } = userObjectLogin; //Http
        const findUser = await this.userModel.findOne({ email })
        if(!findUser) throw new HttpException('USER_NOT_FOUND', 404);

        const checkPassword = await compare(password, findUser.password)

        if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

        // con estas 2 lineas de codigo basicamente le decimos al JWT que es lo que queremos injectarle y asi crear nuestro token JWT (solo faltaria crear nustro guardian, para decirle cuales son las rutas que necesitan tener ese token JWT para ingresar)
        const payload = {id:findUser._id, name:findUser.name}
        const token = this.jwtAuthService.sign(payload)

        const data = {
            user: findUser,
            token,
        };

        return data;
    }
}
