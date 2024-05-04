import { Module } from '@nestjs/common';
import { ClusterController } from './cluster.controller';
import { ClusterService } from './cluster.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cluster, ClusterSchema } from './schemas/cluster.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Cluster.name, schema: ClusterSchema}
    ])
  ],
  controllers: [ClusterController],
  providers: [ClusterService]
})
export class ClusterModule {}
