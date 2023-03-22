import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoriesValidationParametersPipe } from './pipes/categories-validation-parameters.pipe';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Put(':category')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('category', CategoriesValidationParametersPipe) category: string,
  ): Promise<void> {
    await this.categoriesService.update(category, updateCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':category')
  async findOne(
    @Param('category', CategoriesValidationParametersPipe) category: string,
  ): Promise<Category> {
    return await this.categoriesService.findOne(category);
  }

  @Patch(':category/players/:player_id')
  async AssignCategoryToPlayer(@Param() params: string[]): Promise<void> {
    return await this.categoriesService.AssignCategoryToPlayer(params);
  }
}
