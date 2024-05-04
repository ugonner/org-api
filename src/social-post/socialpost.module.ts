import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Socialpost, SocialpostSchema } from './schema/socialpost.schema';
import { SocialpostService } from './socialpost.service';
import { SocialpostController } from './socialpost.controller';
import { UserModule } from '../user/user.module';
import { SocialpostComment, SocialpostCommentSchema } from "./socialpost-comment.schema";
import { FileModule } from '../shared/file/file.module';
import { SocialPostReport, SocialPostReportSchema } from './schema/reported_post.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Socialpost.name, schema: SocialpostSchema },
      { name: SocialpostComment.name, schema: SocialpostCommentSchema },
      { name: SocialPostReport.name, schema: SocialPostReportSchema},
      {name: User.name, schema: UserSchema}
    ]),
    forwardRef(() => UserModule),
    FileModule,
  ],
  providers: [SocialpostService],
  controllers: [SocialpostController],
  exports: [SocialpostService],
})
export class SocialpostModule {}
