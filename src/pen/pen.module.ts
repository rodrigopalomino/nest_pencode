import { Module } from '@nestjs/common';
import { PenController } from './pen.controller';
import { PenService } from './pen.service';

@Module({
  controllers: [PenController],
  providers: [PenService]
})
export class PenModule {}
