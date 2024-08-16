import {
  Component,
  ElementRef,
  HostListener,
  SimpleChanges,
  ViewChild,
  OnChanges, OnInit,
} from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'
import { RouterOutlet } from '@angular/router'
import { HireMeService } from './hire-me.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sendRequestForm: FormGroup
  private currentModal = ''
  private isModalOpen = false
  private clickOutside = false

  // Modal Elements
  @ViewChild('teacherModal') teacherModalElement!: ElementRef<HTMLElement>
  @ViewChild('tsEngineerModal') tseModalElement!: ElementRef<HTMLElement>
  @ViewChild('fsEngineerModal') fseModalElement!: ElementRef<HTMLElement>

  // Modal Boundary Elements
  @ViewChild('teacherModalBoundary') teacherModalBoundary!: ElementRef<HTMLElement>
  @ViewChild('tseModalBoundary') tseModalBoundary!: ElementRef<HTMLElement>
  @ViewChild('fseModalBoundary') fseModalBoundary!: ElementRef<HTMLElement>

  constructor(private _formBuilder: FormBuilder, private hireMeService: HireMeService) {
    this.sendRequestForm = this._formBuilder.group({
      frontEnd: '',
      backEnd: '',
      devOps: '',
      fullStack: '',
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  public onSubmit(): void {
    this.hireMeService.sendRequest()
    console.log('Form submitted')
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
}
