import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './job.service';
import { JobEntity } from './entity/job.entity';
import { JobController } from './job.controller';

@Module({
    imports: [
    TypeOrmModule.forFeature([JobEntity]),
    ],
    providers: [JobService],
    controllers: [JobController],
    exports: [JobService],
})
export class JobModule {}
