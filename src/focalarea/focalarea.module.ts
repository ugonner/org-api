import { Module } from '@nestjs/common';
import { FocalareaController } from './focalarea.controller';
import { FocalareaService } from './focalarea.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Focalarea, FocalareaSchema } from './schemas/focalarea.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Focalarea.name, schema: FocalareaSchema}
    ])
  ],
  controllers: [FocalareaController],
  providers: [FocalareaService]
})
export class FocalareaModule {}
