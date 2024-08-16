import { TestBed } from '@angular/core/testing'

import { HireMeService } from './hire-me.service'

describe('HireMeService', () => {
  let service: HireMeService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(HireMeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
