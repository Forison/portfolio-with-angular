import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { RouterOutlet } from '@angular/router'
import { SendReqestObject } from './send-reqest-object'
import { HireMeService } from './hire-me.service'
import { BehaviorSubject, of, timeout } from 'rxjs'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public sendRequestForm: FormGroup
  private currentModal = ''
  private isModalOpen = false
  private clickOutside = false
  private submissionSubject = new BehaviorSubject<boolean>(false)
  public isSuccess$ = this.submissionSubject.asObservable()

  // Modal Elements
  @ViewChild('teacherModal') teacherModalElement!: ElementRef<HTMLElement>
  @ViewChild('tsEngineerModal') tseModalElement!: ElementRef<HTMLElement>
  @ViewChild('fsEngineerModal') fseModalElement!: ElementRef<HTMLElement>

  // Modal Boundary Elements
  @ViewChild('teacherModalBoundary') teacherModalBoundary!: ElementRef<HTMLElement>
  @ViewChild('tseModalBoundary') tseModalBoundary!: ElementRef<HTMLElement>
  @ViewChild('fseModalBoundary') fseModalBoundary!: ElementRef<HTMLElement>

  constructor(private _formBuilder: FormBuilder, private _hireMeService: HireMeService) {
    this.sendRequestForm = this._formBuilder.group({
      frontEnd: '',
      backEnd: '',
      devOps: '',
      fullStack: '',
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  public async onSubmit() {
    const payload = this.transformFormData(this.sendRequestForm)
    const response = await this._hireMeService.sendRequest(payload)
    if (response === 'OK') {
      this.submissionSubject.next(true)
      console.log(this.submissionSubject.value)
      // setTimeout(() => {
      //   this.submissionSubject.next(false)
      // }, 2000);
    }
    console.log(this.submissionSubject.value)
    console.log(response)
  }

  public openModal(modalType: 'teacher' | 'tse' | 'fse'): void {
    switch (modalType) {
      case 'teacher':
        this.teacherModalElement.nativeElement.style.display = 'block'
        this.currentModal = 'teacher'
        break
      case 'tse':
        this.tseModalElement.nativeElement.style.display = 'block'
        this.currentModal = 'tse'
        break
      case 'fse':
        this.fseModalElement.nativeElement.style.display = 'block'
        this.currentModal = 'fse'
        break
    }

    this.isModalOpen = true
    this.clickOutside = false
  }

  public closeModal(): void {
    if (this.currentModal === 'teacher') {
      this.teacherModalElement.nativeElement.style.display = 'none'
    } else if (this.currentModal === 'tse') {
      this.tseModalElement.nativeElement.style.display = 'none'
    } else if (this.currentModal === 'fse') {
      this.fseModalElement.nativeElement.style.display = 'none'
    }

    this.currentModal = ''
    this.isModalOpen = false
  }

  @HostListener('document:click', ['$event'])
  public onClickOutside(event: MouseEvent): void {
    const target = event.target as Node

    if (!this.isClickInsideModal(target)) {
      if (this.isModalOpen && this.clickOutside) {
        this.closeModal()
      }
      this.clickOutside = true
    }
  }

  private isClickInsideModal(target: Node): boolean {
    return (
      this.teacherModalBoundary.nativeElement.contains(target) ||
      this.tseModalBoundary.nativeElement.contains(target) ||
      this.fseModalBoundary.nativeElement.contains(target)
    )
  }

  private transformFormData(formGroup: FormGroup): SendReqestObject {
    const myObject = { ...formGroup.value }
    Object.entries(myObject).forEach(([key, value]) => {
      if (value === true) {
        myObject[key] = `${key}`
      } else if (value === false) {
        myObject[key] = ''
      }
    })
    return myObject
  }

}
