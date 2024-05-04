import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './file.schema';
import { StorageService } from './storage/storage.service';
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema }
    ]),
  ],
  controllers: [FileController],
  providers: [FileService, StorageService],
  exports: [FileService],
})
export class FileModule {}
