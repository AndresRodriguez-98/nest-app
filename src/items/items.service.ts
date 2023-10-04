/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Items, ItemsDocument } from './schema/items.schema';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(
    // Lo unico que faltaba era conectar el esquema de items con nuestra logica de negocios, y lo logramos asi:
    @InjectModel(Items.name) private itemsModule: Model<ItemsDocument>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    // El DTO (Data transfer object) nos trae toda la data del body
    const itemCreated = this.itemsModule.create(createItemDto);
    return itemCreated;
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
