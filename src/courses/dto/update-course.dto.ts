import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./create-course.dto";

export class UpdateCourseDto extends PartialType(CreateCourseDto){} 
//partial type faz com que todos os atributos da classe passada no paramentro sejam opcionais
