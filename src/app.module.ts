import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ProductEntity } from './modules/products/entities/product.entity';
import { CategoryEntity } from './modules/categories/entities/category.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';




console.log('http://localhost:7777/', join(__dirname, '..', 'upload'));




@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      serveRoot: '/upload',
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '22$$iiII',
    database: 'ecommerce',
      entities: [UserEntity, ProductEntity, CategoryEntity],
    synchronize: true,
    }),
    ProductsModule, CategoriesModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
