import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { User, UserDocument } from "../schemas/user.schema" 
import { UserDTO } from '../dtos/user.dto';
import { ApiResponse, IGenericResponse } from '../../shared/apiResponse';
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { TokenService } from '../tokens/token.service';
import { EmailService } from '../../shared/utils/email';
import { GenericEmailTemplate } from '../../shared/templates/generic.email';
import { generateUniqueCode } from '../../shared/utils/db';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { LoginDTO, RequestTokenEmailDTO, ResetPasswordDTO } from './dtos/auth.dto';
import { Jwt } from '../../shared/guards/auth.guard';
import { VerifyTokenDTO } from '../tokens/token.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private tokenService: TokenService,
      ) {}
    
      async createUser(dto: UserDTO): Promise<IGenericResponse<UserDocument>> {
        try {
          const encryptedPassword = await this.hashPassword(dto.password);
          dto.password = encryptedPassword.status
            ? encryptedPassword.data
            : dto.password;
          const user = await this.userModel.create(dto);
          if(!user) return ApiResponse.fail("no user cerated", HttpStatus.BAD_REQUEST);

          const contentCode = await this.tokenService.genToken({
            user: `${user._id}`,
            tokenType: "signupVerification"
          })
          if(!contentCode.status) return ApiResponse.fail(contentCode.message, contentCode.statusCode);
          const html = GenericEmailTemplate.generateEmailTemplate({
            contentHeader: `Hi ${user.firstName}, Happy to have you.`,
            contentText: `Thank you for coming on board our platform, here is your email verification code below, code expires in 10 minutes`,
            contentCode: contentCode.data?.token,
          })
          const emailOptions: MailOptions = {
            subject: `Welcome on board`,
            from: `<${process.env.APP_EMAIL}> ${process.env.APP_NAME}`,
            to: `${user.email}`,
            html: html.html
          }
          EmailService.sendEmail(emailOptions)
          .then(() => console.log("emal verification code sent"))
          .catch((err) => console.log("faildd to send verification email", err.message))

          return ApiResponse.success('user created', HttpStatus.CREATED, user);
        } catch (error) {
          return ApiResponse.fail(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
            error,
          );
        }
      }

      async requestVerificationEmail(dto: RequestTokenEmailDTO): Promise<IGenericResponse<UserDocument>> {
        try {

          const user = await this.userModel.findOne({email: dto.email});
          if(!user) return ApiResponse.fail("no user found", HttpStatus.NOT_FOUND);

          const contentCode = await this.tokenService.genToken({
            user: `${user._id}`,
            tokenType: "signupVerification"
          })
          if(!contentCode.status) return ApiResponse.fail(contentCode.message, contentCode.statusCode);
          const html = GenericEmailTemplate.generateEmailTemplate({
            contentHeader: `Hi ${user.firstName}, Happy to have you.`,
            contentText: `Thank you for coming on board our platform, here is your email verification code below, code expires in 10 minutes`,
            contentCode: contentCode.data?.token,
          })
          const emailOptions: MailOptions = {
            subject: `Welcome on board`,
            from: `<${process.env.APP_EMAIL}> ${process.env.APP_NAME}`,
            to: `${user.email}`,
            html: html.html
          }
          EmailService.sendEmail(emailOptions)
          .then(() => console.log("emal verification code sent"))
          .catch((err) => console.log("faildd to send verification email", err.message))

          return ApiResponse.success(`token sent to ${dto.email}`, HttpStatus.OK, user);
        } catch (error) {
          return ApiResponse.fail(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
            error,
          );
        }
      }

      

      async verifyUser(dto: VerifyTokenDTO): Promise<IGenericResponse<UserDocument>> {
        try {

          const isVerified = await this.tokenService.verifyToken(dto);
          if(!isVerified.status || !isVerified.data.valid) return ApiResponse.fail(isVerified.message, isVerified.statusCode);
          const user = await this.userModel.findByIdAndUpdate(
            isVerified.data.userId,
            {emailVerified: true}
          )

          return ApiResponse.success('email verified', HttpStatus.OK, user);
        } catch (error) {
          return ApiResponse.fail(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
            error,
          );
        }
      }

      

      async login(dto: LoginDTO): Promise<IGenericResponse<{token: string;}>>{
        try{
            const user = await this.userModel.findOne({email: dto.email});
            if(!user) return ApiResponse.fail("no user found", HttpStatus.NOT_FOUND)
            //if(!user.status || user.status === "deactivated" ) return ApiResponse.fail("your user status in inactive", HttpStatus.BAD_REQUEST)
            if(!user.emailVerified) return ApiResponse.fail("your email account is not verified", HttpStatus.FORBIDDEN);

            const isPasswordValid = await this.verifyPassword(dto.password, user.password);
            if(!isPasswordValid.status && !isPasswordValid.data) return ApiResponse.fail("unmatching user credentials", HttpStatus.BAD_REQUEST);
            
            const jwtToken = Jwt.signJWT({id: `${user._id}`}, `${process.env.JWT_SECRET}`, "10 days");

            const userObj = {userId: user._id.toString(), role: user.role, avatar: user.avatar, firstName: user.firstName, emai: user.email };
            return ApiResponse.success("successful login", HttpStatus.OK, {user: userObj, token: jwtToken}); 
        }catch(error){
            return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
      }

  private scryptPromise = promisify(scrypt);
  private PASSWORD_STRENGTH = 32;

  async hashPassword(password: string): Promise<IGenericResponse<string>> {
    try {
      const salt = randomBytes(16).toString('hex');
      const derivedKey = await this.scryptPromise(
        password,
        salt,
        this.PASSWORD_STRENGTH,
      );
      return ApiResponse.success(
        'pass encrypted',
        HttpStatus.OK,
        salt + ':' + (derivedKey as Buffer).toString('hex'),
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async verifyPassword(
    password: string,
    hash: string,
  ): Promise<IGenericResponse<boolean>> {
    try {
      const [salt, key] = hash.split(':');
      
      const keyBuffer = Buffer.from(key, 'hex');
      const derivedKey = await this.scryptPromise(
        password,
        salt,
        this.PASSWORD_STRENGTH,
      );
      
      const isValid = timingSafeEqual(keyBuffer, derivedKey as Buffer);
      if (isValid)
        return ApiResponse.success('Validation done', HttpStatus.OK, isValid);
      return ApiResponse.fail(
        'password not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
        isValid,
      );
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  
  async requestResetPasswordToken(email: string): Promise<IGenericResponse<boolean>>{
    try{
        const user = await this.userModel.findOne({email});
        if(!user) return ApiResponse.fail("no such user account found", HttpStatus.NOT_FOUND);
        const contentCode = await this.tokenService.genToken({
            user: `${user._id}`,
            tokenType: "resetPassword",
        });
        if(!contentCode.status) return ApiResponse.fail(contentCode.message, contentCode.statusCode);
        const html = GenericEmailTemplate.generateEmailTemplate({
            contentHeader: `Hi ${user.firstName},`,
            contentText: `You requested a password reset process, you probably forgot your password, Enter the token below to retrieve your account`,
            contentCode: contentCode.data.token,
        })
        const emailOptions: MailOptions = {
            to: email,
            subject: `Password Reset`,
            html: html.html
        }
        EmailService.sendEmail(emailOptions)
        .then(() => console.log("reset password token email sent"))
        .catch((err) => console.log("Error sending reset password token email", err.mesage));

        return ApiResponse.success(`reset password token sent ${email}`, HttpStatus.OK, true);

    }catch(error){
        return ApiResponse.fail(error.mesage, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }

  async resetForgotPassword(email: string, token: string): Promise<IGenericResponse<boolean>> {
    try{
        const user = await this.userModel.findOne({email});
        if(!user) return ApiResponse.fail("no such user found", HttpStatus.NOT_FOUND);
        const verifiedToken = await this.tokenService.verifyToken({
            token,
            tokenType: "resetPassword"
        })
        if(!verifiedToken.status || !verifiedToken.data) return ApiResponse.fail("invalid token", HttpStatus.BAD_REQUEST);
        const newPassword = await this.hashPassword(token);
        if(!newPassword.status) return ApiResponse.fail("unable to reset password, please restart the process", HttpStatus.BAD_GATEWAY);
        user.password = newPassword.data;
        await user.save();
        return ApiResponse.success("password reset successful", HttpStatus.OK, true)
    }catch(error){
        return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error);
    }
  }


  async resetPassword(dto: ResetPasswordDTO): Promise<IGenericResponse<boolean>>{
    try{
        const user = await this.userModel.findOne({email: dto.email});
        const isValidPassword = await this.verifyPassword(dto.oldPassword, user.password);
        if(!isValidPassword.status || !isValidPassword.data) return ApiResponse.fail("invalid credentials", HttpStatus.BAD_REQUEST);
        user.password = dto.password;
        await user.save()
        return ApiResponse.success(`reset password successful`, HttpStatus.OK, true);

    }catch(error){
        return ApiResponse.fail(error.mesage, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
  
}
