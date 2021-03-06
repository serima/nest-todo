import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from "../entities/item.entity";
import { CreateItemDTO, DeleteItemDTO, UpdateItemDTO } from './item.dto';
import { InsertResult, UpdateResult, DeleteResult, ReturningStatementNotSupportedError } from 'typeorm';

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

    // item/id番号/updateのURIにPUTメソッドで指定したデータ更新
    @Put(":id/update")
    async update(
        @Param("id") id: string,
        @Body() itemData: UpdateItemDTO,
    ): Promise<UpdateResult> {
        const newData = !itemData.idDone
            ? itemData
            : {
                ...itemData,
                ...{ idDone: itemData.idDone.toLowerCase() === "true" },
            };
        return await this.service.update(Number(id), newData);

    }

    // パスワード無しで即削除(テスト用)
    @Delete(":id/delete")
    async delete(@Param("id") id: string): Promise<DeleteResult> {
        return await this.service.delete(Number(id));
    }

    @Post(":id/delete")
    async deleteItem(
        @Param("id") id: string,
        @Body() deleteItem: DeleteItemDTO,
    ) {
        const item = await this.service.find(Number(id));
        if (!item) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: `Missing item(id: ${id})`,
                },
                404,
            );
        }
        try {
            await this.service.deleteByPassword(
                Number(id),
                deleteItem.deletePassword,
            );
        } catch (e) {
            if (e.message === "incorrect password.") {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: "Incorrect password",
                },
                    403
                );
            }
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: "internal server error",
                },
                500,
            );
        }
    }
}
