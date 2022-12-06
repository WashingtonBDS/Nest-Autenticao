import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly JwtService: JwtService) { }

    login(user: User): UserToken {
        // Transformar o user em  um JWT
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        const JwtToken = this.JwtService.sign(payload);
        
        return {
            access_token: JwtToken,
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }

        throw new Error('Email address or password is incorrect.');

    }
}
