import { container, inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    const isEmailInUse = await this.customersRepository.findByEmail(email)

    if(isEmailInUse) {
      throw new AppError("This email is already in use.")
    }

    const customer = await this.customersRepository.create({ name, email });

    return customer;
  }
}

export default CreateCustomerService;
