import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class NoticeDTO {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contentHeader?: string;

  @ApiProperty()
  @IsString()
  contentText: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  contentCode?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  contentFooter?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  contentDisclaimer? = `Please Disregard this email if you did not initiate any relating actions or contact support`;
}

export class GenericEmailTemplate {

    static generateEmailTemplate(content: NoticeDTO): {html: string}{
      const html = `
          <div style="background-color: #f5f5f5; padding: 20px;">
              <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
                  <div style="text-align: center;">
                      <img src="${
                        process.env.APP_LOGO
                      }" alt="Logo" border="0" style="width: 100px; height: 100px;">
                  </div>
                  <div style="text-align: center;">
                      <h1 style="color: #000; font-size: 30px; font-weight: 600;">${
                        process.env.APP_NAME
                      }</h1>
                  </div>
                  <div style="text-align: center;">
                      <p style="color: #000; font-size: 16px; font-weight: 400;">${
                        content.contentHeader ?? ''
                      }</p>
                  </div>
                  <div style="text-align: center;">
                      <p style="color: #000; font-size: 16px; font-weight: 400;">${
                        content.contentText
                      }</p>
                  </div>
                  <div style="text-align: center;">
                      <h1 style="color: #000; font-size: 30px; font-weight: 600;">${
                        content.contentCode ?? ''
                      }</h1>
                  </div>
                  <div style="text-align: center;">
                      <p style="color: #000; font-size: 16px; font-weight: 400;">${
                        content.contentFooter ?? ''
                      }</p>
                  </div>
                  <div style="text-align: center;">
                      <p style="color: #000; font-size: 16px; font-weight: 400;">${
                        content.contentDisclaimer ?? ''
                      }.</p>
                  </div>
                  <div style="text-align: center;">
                      <p style="color: #000; font-size: 16px; font-weight: 400;">Regards,</p>
                  </div>
                  <div style="text-align: center;">
                      <p style="color: #000; font-size: 16px; font-weight: 400;">${
                        process.env.APP_NAME
                      } Team</p>
                  </div>
              </div>
          </div>
          `;
      return {
        html,
      };
    };
    
}