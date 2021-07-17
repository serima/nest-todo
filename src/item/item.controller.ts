import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from "../entities/item.entity";
import { CreateItemDTO } from './item.dto';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

@Controller('item')
export class ItemController {
    constructor(private readonly service: ItemService) { }

    // itemのURIへのGETメソッドで全件取得。serviceのfindAll()を実行
    @Get()
    async getItemList(): Promise<Item[]> {
        return await this.service.findAll();
    }

    // itemのURIへのPOSTメソッドでデータ新規登録
    @Post()
    async addItem(@Body() item: CreateItemDTO): Promise<InsertResult> {
        return await this.service.create(item);
    }

    // item/id番号のURIへのGETメソッドでid指定で1件データ取得
    @Get(":id")
    async getItem(@Param("id") id: string): Promise<Item> {
        return await this.service.find(Number(id));
    }
}
