import { Injectable } from '@angular/core'
import emailjs from '@emailjs/browser'
import { SendReqestObject } from './send-reqest-object'

@Injectable({
  providedIn: 'root'
})
export class HireMeService {
  public async sendRequest(payload: SendReqestObject): Promise<string> {
    const { name, email, frontEnd, backEnd, devOps, fullStack } = payload
    // deliberate exposure of key in other to use the free email service without using a backend
    emailjs.init('CKvXQLxOKMxQKmN42')
    try {
      const response = await emailjs.send('service_k2wo2tv', 'template_c36u47c', {
        sender_name: name,
        skill_set: [frontEnd, backEnd, fullStack, devOps].join(','),
        sender_email: email,
      })

      return response.text
    } catch (error) {
      console.log(error)
      throw new Error('Failed to send email')
    }
  }
}
