import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export class UserMessageConfigDTO {
    @ApiProperty()
    @IsEnum(["SMS", "Email"], {message: `messageType must be one of "SMS", "Email"`})
    @IsString()
    messageType: "SMS" | "Email";

    @ApiProperty()
    @IsString()
    message: string;
    
    @ApiProperty()
    @IsString()
    subject: string;
}