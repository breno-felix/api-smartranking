import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly categoryRepository: Repository<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category } = createCategoryDto;

    const existCategory = await this.categoryRepository.findOne({
      where: { category },
    });

    if (existCategory) {
      throw new BadRequestException(`The category ${category} already exist`);
    }

    const createCategory = this.categoryRepository.create(createCategoryDto);

    return await this.categoryRepository.save(createCategory);
  }

  async update(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const existCategory = await this.categoryRepository.findOne({
      where: { category },
    });

    if (!existCategory) {
      throw new NotFoundException(`The Category ${category} not found`);
    }

    const { description, events } = updateCategoryDto;

    existCategory.description = description;
    existCategory.events = events;

    await this.categoryRepository.save(existCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: { players: true } });
  }

  async findOne(category: string): Promise<Category> {
    const existCategory = await this.categoryRepository.findOne({
      where: { category },
      relations: { players: true },
    });
    if (!existCategory) {
      throw new NotFoundException(`The category ${category} not found`);
    }
    return existCategory;
  }

  async AssignCategoryToPlayer(params: string[]): Promise<void> {
    const category = params['category'];
    const player_id = params['player_id'];

    const existCategory = await this.categoryRepository.findOne({
      where: { category },
    });

    if (!existCategory) {
      throw new NotFoundException(`The category ${category} not found`);
    }

    const player = await this.playersService.findOne(player_id);

    if (!existCategory.players) {
      existCategory.players = [];
    }

    existCategory.players.push(player);

    await this.categoryRepository.save(existCategory);
  }
}
