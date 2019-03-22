/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KnowledgeService } from './knowledge.service';

describe('Service: KnowledgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnowledgeService]
    });
  });

  it('should ...', inject([KnowledgeService], (service: KnowledgeService) => {
    expect(service).toBeTruthy();
  }));
});
