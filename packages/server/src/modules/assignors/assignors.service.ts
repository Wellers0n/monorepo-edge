import { Injectable } from '@nestjs/common';
import { CreateAssignorDataDTO } from './dtos/create-assignor.dto';
import { FindOneAssignorDataDTO } from './dtos/find-one-assignor.dto';
import { AssignorsRepository } from './assignors.repository';
import { UpdateAssignorDataDTO } from './dtos/update-assignor.dto';
import { FindAssignorDataDTO } from './dtos/find-assignor.dto';
import { DeleteAssignorDataDTO } from './dtos/delete-assignor.dto';

@Injectable()
export class AssignorsService {
  constructor(private assignorsRepository: AssignorsRepository) {}

  async create(data: CreateAssignorDataDTO) {
    const { name, email, phone, document, userId } = data;
    return this.assignorsRepository.create({
      name,
      email,
      phone,
      document,
      userId,
    });
  }
  async findOne(data: FindOneAssignorDataDTO) {
    const { id } = data;
    return this.assignorsRepository.findOne(id);
  }

  async find(data: FindAssignorDataDTO) {
    const { email, name, phone, document } = data;
    return this.assignorsRepository.find({ email, name, phone, document });
  }

  async update(data: UpdateAssignorDataDTO) {
    const { email, id, name, phone, document } = data;
    return this.assignorsRepository.update({
      name,
      email,
      phone,
      document,
      id,
    });
  }

  async delete(data: DeleteAssignorDataDTO) {
    const { id } = data;
    this.assignorsRepository.delete(id);
  }
}
