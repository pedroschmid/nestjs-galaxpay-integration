import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/database/database.module';
import { LeadModule } from 'src/lead/lead.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, LeadModule],
})
export class AppModule {}
