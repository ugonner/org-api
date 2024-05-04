import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Token, TokenDocument } from "./token.schema"
import { ApiResponse, IGenericResponse } from '../../shared/apiResponse';
import { TokenDTO, VerifyTokenDTO } from './token.dto';
import { generateUniqueCode } from '../../shared/utils/db';

// export const TokenModel = mongoose.model<Token>('Token', TokenSchema);
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenModel: mongoose.Model<TokenDocument>,
  ) {}
  genToken = async (
    dto: TokenDTO
  ): Promise<IGenericResponse<TokenDocument>> => {
    try{
      const token = await generateUniqueCode(6, this.tokenModel, "token");
      if(!token.status) return ApiResponse.fail("faildd to generate token, please request for token", HttpStatus.INTERNAL_SERVER_ERROR);
      const createdToken = await this.tokenModel.create({
        user: dto.user,
        token: token.data,
        tokenType: dto.tokenType
      });
      return ApiResponse.success("token generated", HttpStatus.CREATED, createdToken);
    }catch(error){
      return ApiResponse.fail(error.message, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  };

  verifyToken = async (dto: VerifyTokenDTO): Promise<IGenericResponse<{ valid: boolean; userId: string }>>  => {
    const tokenData = await this.tokenModel.findOne({ token: dto.token, tokenType: dto.tokenType });
    let tokenExpired = false;
    if (Date.now() >= (new Date(((tokenData as any).createdAt)).getTime() + tokenData.expiresIn) ) {
      tokenExpired = true;
    }
    if (!tokenData || tokenData.expired || tokenExpired) {
      return ApiResponse.fail("Token is invalid or expired", HttpStatus.UNPROCESSABLE_ENTITY, {valid: false, userId: tokenData.user})
    }
    await this.tokenModel.deleteMany({ user: tokenData.user, tokenType: dto.tokenType });
    return ApiResponse.success("Token is valid", HttpStatus.OK, { valid: true, userId: tokenData.user })
  };
}
