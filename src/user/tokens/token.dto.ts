import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export class TokenDTO {
    @ApiProperty()
    @IsString()
    user: string;

    @ApiProperty()
    @IsEnum([`signupVerification`, 'resetPassword'], {message: "tokenType must one of `signupVerification`, 'resetPassword'"})
    @IsString()
    tokenType: `signupVerification`| 'resetPassword';
}

export class VerifyTokenDTO {
    @ApiProperty()
    @IsString()
    token: string;

    @ApiProperty()
    @IsEnum([`signupVerification`, 'resetPassword'], {message: "tokenType must one of `signupVerification`, 'resetPassword'"})
    @IsString()
    tokenType: `signupVerification`| 'resetPassword';
}

export enum TokenType {
    
    SIGNUP_VERIFICATION = `signupVerification`,
    RESET_PASSWORD = 'resetPassword'
}
