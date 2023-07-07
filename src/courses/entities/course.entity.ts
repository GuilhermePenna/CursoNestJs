import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm"
import { Tag } from "./tag.entity"

@Entity("courses")//por padrao o nome da tabela vai ser o mesmo da classe, so que em minusculo. Caso queira trocar o nome, passe por parametro na chamada @Entity()
export class Course{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    description:string

    @JoinTable()
    @ManyToMany(()=> Tag,(tag)=>tag.courses,{cascade:true, eager: true},)
    tags:Tag[]
}