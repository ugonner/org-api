import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { ApiResponse, IGenericResponse } from '../../apiResponse';
import { HttpStatus } from '@nestjs/common';

export class EmailService {
  static async sendEmail(mailOptions: nodemailer.SendMailOptions): Promise<IGenericResponse<any>> {
    try {
      const transporter = nodemailer.createTransport({
        //service: 'gmail',
        host: `${process.env.NODEMAILER_HOST}`,
        port: Number(`${process.env.NODEMAILER_PORT}`), // or the port your SMTP server uses
        secure: false,
        auth: {
          user: `${process.env.NODEMAILER_USER}`,
          pass: `${process.env.NODEMAILER_PASS}`,
        },
      });
      console.log("email", `${process.env.NODEMAILER_USER}`, "PASS", `${process.env.NODEMAILER_PASS}`)

      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
          if (err)
            reject(
              ApiResponse.fail(
                err.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
                err,
              ),
            );
          resolve(ApiResponse.success('email sent', HttpStatus.OK, info));
        });
      });
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
