import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CoursesModule,TypeOrmModule.forRoot({
    type:"postgres",
    host:"db",
    port:5555,
    username:"postgres",
    password:"docker",
    database:"cursonestjs",
    autoLoadEntities:true,
    synchronize:false// essa opção setada como true, sincroniza o banco de dados de uma forma onde se alguma coluna for alterada, todo os os dados serão perdidos
    // e a mesma vai ser recriada com as alterações feitas NÃO USAR EM PROD
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
