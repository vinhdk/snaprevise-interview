import { BaseService } from './base.service';
import { PaperRepository } from '../repositories';
import { Paper } from '../models';
import { IPaperService } from '../interfaces';

export class PaperService extends BaseService<Paper, PaperRepository> implements IPaperService {
  constructor(
    protected readonly repository: PaperRepository
  ) {
    super(repository);
  }
}
