import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res,Patch, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesServices:CoursesService){}
    
    @Get("list")
    async findAll(@Res() response){
        const courses =  await this.coursesServices.findAll()
        return response.status(200).json({success:true, data: courses})
    }
    
    @Get(":id")
    findOne(@Param("id") id:string){ //@Param pode ser usado com destructuring para pegar um parametro especifico
       return this.coursesServices.findOne(id)
    }

    /*
    @Get(":id") //rota get passando como parametro um id
    findOne(@Param()params ){ @Param está sendo utilizado sem destructuring. Nesse modo ele pega a lista de todos os parametros definidos
        return `Curso #${params.id}`
    }*/

    @Post()
    create(@Body() createCourseDto:CreateCourseDto){
        return this.coursesServices.create(createCourseDto)
    }

    @Patch(":id")
    update(@Param("id") id:string, @Body() UpdateCourseDto:UpdateCourseDto){
        return this.coursesServices.update(id,UpdateCourseDto)
    }

    @Delete(":id")
    delete(@Param("id") id:string){
        return this.coursesServices.remove(id)
    }
}
