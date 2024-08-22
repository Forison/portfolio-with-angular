import { Injectable } from '@angular/core'
import emailjs from '@emailjs/browser'
import { SendReqestObject } from './send-reqest-object'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HireMeService {
  public async sendRequest(payload: SendReqestObject): Promise<string> {
    const { name, email, frontEnd, backEnd, devOps, fullStack } = payload
    emailjs.init(environment.MAIL_INIT)
    try {
      const response = await emailjs.send(environment.MAIL_SERVICE, environment.MAIL_TEMPLATE, {
        sender_name: name,
        skill_set: [frontEnd, backEnd, fullStack, devOps].join(','),
        sender_email: email,
      })
      console.log(response)
      return response.text
    } catch (error) {
      console.log(error)
      throw new Error('Failed to send email')
    }
  }
}
