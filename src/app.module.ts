import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ClusterModule } from './cluster/cluster.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FocalareaModule } from './focalarea/focalarea.module';
import { CategoryModule } from './categories/category.module';
import { SocialpostModule } from './social-post/socialpost.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    //ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>(`DB_LOCAL`)
        }
      },
      inject: [ConfigService]
    }),
    MulterModule.register({
      dest: './uploads', // Destination folder for uploaded files
    }),
    UserModule,
    ClusterModule,
    FocalareaModule,
    CategoryModule,
    SocialpostModule,
    TestimonialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
