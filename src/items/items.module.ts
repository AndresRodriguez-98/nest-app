import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Items, ItemsSchema } from './schema/items.schema';

// De esta manera, logramos que el esquema de items pase a ser parte del modulo de items:
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Items.name,
        schema: ItemsSchema,
      },
    ]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
