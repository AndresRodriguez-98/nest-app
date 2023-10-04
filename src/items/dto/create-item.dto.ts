import { IsNumber, IsString } from 'nestjs-swagger-dto';

export class CreateItemDto {
  @IsString({
    minLength: 3,
    maxLength: 80,
  })
  name: string;

  @IsNumber()
  price: number;

  @IsString({ optional: true, maxLength: 255 })
  description?: string;
}
