import { Injectable } from '@nestjs/common';
import { CreatePayableDataDTO } from './dtos/create-payable.dto';
import { FindOnePayableDataDTO } from './dtos/find-one-payable.dto';
import { PayablesRepository } from './payables.repository';
import { UpdatePayableDataDTO } from './dtos/update-payable.dto';
import { FindPayableDataDTO } from './dtos/find-payable.dto';
import { DeletePayableDataDTO } from './dtos/delete-payable.dto';

@Injectable()
export class PayablesService {
  constructor(private payablesRepository: PayablesRepository) {}

  async create(data: CreatePayableDataDTO) {
    const { value, valueInCents, emissionDate, userId, assignorId } = data;
    return this.payablesRepository.create({
      value,
      valueInCents,
      emissionDate,
      userId,
      assignorId,
    });
  }
  async findOne(data: FindOnePayableDataDTO) {
    const { id } = data;
    return this.payablesRepository.findOne({ id });
  }

  async findAll(data: FindPayableDataDTO) {
    const { emissionDate, assignorId, limit, offset } = data;
    return this.payablesRepository.findAll({
      emissionDate,
      assignorId,
      limit,
      offset,
    });
  }

  async update(data: UpdatePayableDataDTO) {
    const { id, value, valueInCents } = data;
    return this.payablesRepository.update({
      id,
      value,
      valueInCents,
    });
  }

  async delete(data: DeletePayableDataDTO) {
    const { id } = data;
    this.payablesRepository.delete(id);
  }
}
