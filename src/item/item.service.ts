import { Injectable } from '@nestjs/common';
import { Item } from "src/entities/item.entity";
import { Repository, InsertResult, UpdateResult, DeleteResult } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItemDTO } from './item.dto';
@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) { }

    // テーブルの全データを取得する
    async findAll(): Promise<Item[]> {
        return await this.itemRepository.find();
    }

    // テーブルにアイテムを追加する
    async create(item: CreateItemDTO): Promise<InsertResult> {
        return await this.itemRepository.insert(item);
    }

    // idを指定してテーブルから1件のデータを取得する
    async find(id: number): Promise<Item> | null {
        return await this.itemRepository.findOne({ id: id });
    }

    // idを指定してテーブルのデータを更新する
    async update(id: number, item): Promise<UpdateResult> {
        return await this.itemRepository.update(id, item);
    }

    // idを指定してテーブルのデータを削除する
    async delete(id: number): Promise<DeleteResult> {
        return await this.itemRepository.delete(id);
    }

    // パスワードを使用した削除
    async deleteByPassword(
        id: number,
        deletePassword: string,
    ): Promise<DeleteResult> {
        const targetItem = await this.find(id);
        if (!targetItem) {
            return Promise.reject(new Error("missing item."));
        }
        if (targetItem.deletePassword !== deletePassword) {
            return Promise.reject(new Error("incorrect password."));
        }

        return await this.itemRepository.delete(id);
    }

}
