import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PenService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}


  async createPen(createPenDto:){}
}
