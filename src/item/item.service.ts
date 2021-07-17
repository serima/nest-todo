import { Injectable } from '@nestjs/common';
import { Item } from "src/entities/item.entity";
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<item>
    ) { }
}
