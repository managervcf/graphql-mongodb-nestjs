import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async createLesson({
    name,
    startDate,
    endDate,
    students,
  }: CreateLessonInput): Promise<Lesson> {
    const lesson = this.lessonRepository.create({
      name,
      startDate,
      endDate,
      id: uuid(),
      students,
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(lessonId: string, studentIds: string[]) {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
