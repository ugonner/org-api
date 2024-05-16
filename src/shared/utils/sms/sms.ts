import { Body, HttpStatus } from '@nestjs/common';
import { ApiResponse, IGenericResponse } from '../../apiResponse';

export interface IInfoBipDestination {
  to: string;
}
export interface IInfoBipSMSMessage {
  destinations: IInfoBipDestination[];
  from: string;
  text: string;
}
export interface IInfoBipSMSPayload {
  messages: IInfoBipSMSMessage[];
}

export class SMSService {
  static async sendSMSWithInfoBip(
    destinationNumbers: string[],
    messageText: string,
  ): Promise<IGenericResponse<boolean>> {
    try {

      const destinations: IInfoBipDestination[] = destinationNumbers.map((num) => {
        const formattedNum = num.substr(0, 3) !== "234" || num.length !== 13 ? `234${num}` : num;
        return {to: formattedNum}
        
      });
      const payload: IInfoBipSMSPayload = {
        messages: [
          {
            destinations,
            text: messageText,
            from: `${process.env.INFOBIP_SMS_SERVICE_NAME}`,
          },
        ],
      };

      fetch(`${process.env.INFOBIP_BASE_URL}`, {
        method: 'POST',
        headers: {
          Authorization: `${process.env.INFOBIP_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(() => console.log('sms sent'))
        .catch((err) => console.log('Error sending sms', err.message));
      return ApiResponse.success('sms sent', HttpStatus.OK, true);
    } catch (error) {
      return ApiResponse.fail(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
