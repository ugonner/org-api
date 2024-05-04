import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDTO{
    @ApiProperty()
    @IsEmail({})
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class RequestForgotPasswordTokenDTO{
    @ApiProperty()
    @IsEmail({})
    @IsString()
    email: string;
}

export class ResetForgotPasswordDTO extends RequestForgotPasswordTokenDTO {
    @ApiProperty()
    @IsString()
    token: string;
}

export class RequestTokenEmailDTO{
    @ApiProperty()
    @IsEmail({})
    @IsString()
    email: string;
}

export class ResetPasswordDTO extends LoginDTO{
    @ApiProperty()
    @IsString()
    oldPassword: string;
}