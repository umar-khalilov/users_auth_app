import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/models/users/user.service';
import { IUserAuth } from './interfaces/user-auth.interface';
import { CreateUserDto } from '@/models/users/dto/create-user.dto';
import { PostgresErrorCode } from '@/app/database/constraints/errors.constraint';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { RoleEntity } from '@/models/roles/role.entity';
import { SignInDto } from './sign-in.dto';
import { UserEntity } from '@/models/users/user.entity';
import {
    checkIsMatch,
    convertToHashPassword,
    omitBy,
} from '@/common/utils/helpers.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    private async getAccessJWT(payload: IJwtPayload): Promise<string> {
        return this.jwtService.signAsync(payload);
    }

    private async validateUser(data: SignInDto): Promise<UserEntity> {
        const user = await this.userService.findUserByEmail(data.email);
        if (user && await checkIsMatch(data.password, user?.password)) {
            return user;
        } else {
            throw new UnauthorizedException({
                message: 'Invalid email or password',
            });
        }
    }

    async signUp(data: CreateUserDto): Promise<IUserAuth> {
        try {
            const hashedPassword = await convertToHashPassword(data.password);

            const user = await this.userService.createOne({
                ...data,
                password: hashedPassword,
            });

            const payload: IJwtPayload = {
                sub: user.id,
                email: user.email,
                roles: user.roles.map((role: RoleEntity) => role.value),
            };

            const cuttedUser = omitBy(user, ['roles', 'password']);
            return {
                tokens: { access: await this.getAccessJWT(payload) },
                user: cuttedUser,
            };
        } catch (error) {
            if (error.code === PostgresErrorCode.UniqueViolation) {
                throw new ConflictException(
                    `User with that email: ${data.email} already exist'`,
                );
            }
            throw new BadRequestException('Invalid data');
        }
    }

    async signIn(data: SignInDto): Promise<IUserAuth> {
        const user = await this.validateUser(data);

        const payload: IJwtPayload = {
            sub: user.id,
            email: user.email,
            roles: user.roles.map((role: RoleEntity) => role.value),
        };

        const cuttedUser = omitBy(user, ['roles', 'password']);
        return {
            tokens: { access: await this.getAccessJWT(payload) },
            user: cuttedUser,
        };
    }
}
