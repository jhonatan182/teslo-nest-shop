import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUser();
    await this.insertNewProduct(adminUser);

    return 'ejecutado';
  }

  private async insertUser() {
    const seedUser = initialData.users;

    const users: User[] = [];

    seedUser.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    await this.userRepository.save(users);

    return users[0];
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder('user');
    await queryBuilder.delete().where({}).execute();
  }

  private async insertNewProduct(user: User) {
    await this.productService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productService.create(product, user));
    });

    await Promise.all(insertPromises);
  }
}
