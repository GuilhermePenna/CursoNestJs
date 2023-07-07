import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService{

    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ){}

    findAll():Promise<Course[]>{
        const courses = this.courseRepository.find()
        return courses
    }

    async findOne(id:string):Promise<Course>{
       const course = await this.courseRepository.findOne(id)
       if(!course){
        throw new NotFoundException(`course ID ${id} not found`)
        //throw new NotFoundException()
       }
       return course
    }

    async create(createCourseDto:CreateCourseDto):Promise<Course>{
        const tags = await Promise.all(createCourseDto.tags.map(name=>this.preloadTagByName(name)))

        const course = this.courseRepository.create({...createCourseDto,tags})
        return this.courseRepository.save(course)
    }

    async update(id:string,updateCourseDto:UpdateCourseDto):Promise<Course>{
        const tags = updateCourseDto.tags && (await Promise.all(updateCourseDto.tags.map(name=>this.preloadTagByName(name))))
        const course = await this.courseRepository.preload({
            id: +id ,
            ...updateCourseDto,
            tags,
            // + faz a conversao de uma string pra numerico
        })

        
        if(!course){
            throw new NotFoundException(`course ID ${id} not found`)
            //throw new NotFoundException()
        }
        
        return this.courseRepository.save(course)
    }

    async remove(id:string):Promise<Course>{
        const course = await this.courseRepository.findOne(id)
        
        if(!course){
            throw new NotFoundException(`course ID ${id} not found`)
            //throw new NotFoundException()
        }
        
        return this.courseRepository.remove(course)
    }

    private async preloadTagByName(name:string):Promise<Tag>{
        const tag = await this.tagRepository.findOne({name:name})
        if(tag){
            return tag
        }
        return this.tagRepository.create({name});
    }
}
