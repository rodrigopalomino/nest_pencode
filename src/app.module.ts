import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PenModule } from './pen/pen.module';
import { CommentModule } from './comment/comment.module';
import { CommetController } from './commet/commet.controller';
import { CommetService } from './commet/commet.service';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), PenModule, CommentModule],
  controllers: [CommetController],
  providers: [CommetService],
})
export class AppModule {}
