import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateItemDTO {
    @IsNotEmpty()
    @IsString()
    todo: string;

    @IsNotEmpty()
    @IsString()
    limit: string;

    @IsNotEmpty()
    @IsString()
    deletePassword: string;
}

export class UpdateItemDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    todo: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    limit: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    idDone: string;
}

export class DeleteItemDTO {
    @IsString()
    @IsNotEmpty()
    deletePassword: string;
}
