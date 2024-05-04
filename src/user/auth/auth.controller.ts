import { Body, Controller, Get, Post } from '@nestjs/common';
import { TokenService } from '../tokens/token.service';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiOAuth2, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserDTO } from '../dtos/user.dto';
import { LoginDTO, RequestForgotPasswordTokenDTO, RequestTokenEmailDTO, ResetForgotPasswordDTO, ResetPasswordDTO } from './dtos/auth.dto';
import { VerifyTokenDTO } from '../tokens/token.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @ApiInternalServerErrorResponse()
    @ApiBadRequestResponse()
    @ApiCreatedResponse()
    @Post()
    async registerUser(
        @Body() payload: UserDTO
    ){
        return await this.authService.createUser(payload);
    }
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Post("/login")
    async loginUser(
        @Body() payload: LoginDTO
    ){
        return await this.authService.login(payload);
    }


    
    
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Post("/request-verification-email")
    async requestVerificationEmail(
        @Body() payload: RequestTokenEmailDTO
    ){
        return await this.authService.requestVerificationEmail(payload)
    }

    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Post("/verify-user")
    async verifyUser(
        @Body() payload: VerifyTokenDTO
    ){
        return await this.authService.verifyUser(payload)
    }


    
    
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Post("/forgot-password")
    async requestForgotPasswordResetToken(
        @Body() payload: RequestForgotPasswordTokenDTO
    ){
        return await this.authService.requestResetPasswordToken(payload.email);
    }
    


    
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Post("/reset-forgot-password")
    async resetForgotPassword(
        @Body() payload: ResetForgotPasswordDTO
    ){
        return await this.authService.resetForgotPassword(payload.email, payload.token);
    }

    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse()
    @Post("/reset-password")
    async resetPassword(
        @Body() payload: ResetPasswordDTO
    ){
        return await this.authService.resetPassword(payload);
    }

}
