import { Request, Response } from 'express';
import CustomerService from '../service/CustomerService';
import CustomerData from '../model/Customer';


const customerService = new CustomerService();

class CustomerController {
  async createCustomer(req: Request, res: Response): Promise<Response> {
    const { name, email, cpf, phone, status } = req.body;
    try {
      if (!name || !email || !cpf || !phone || !status) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      const existingEmail = await customerService.findCustomerByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'O email já está cadastrado' });
      } 
      const existingCpf = await customerService.findCustomerByCpf(cpf);
      if (existingCpf) {
        return res.status(400).json({ error: 'O CPF já está cadastrado' });
      }
      const customerData: CustomerData = { id: 0, name, email, cpf, phone, status };
      
      await customerService.createCustomer(customerData);
    
      return res.status(201).json({ message: 'Usuário criado com sucesso!' });

    } catch (error) {
      return res.status(500).json({ error: 'Erro na criação do usuário' });
    };
  };

  async listCustomers(_req: Request, res: Response): Promise<void> {
    try {
      const customers = await customerService.listCustomers();
      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar os clientes' });
    }
  };

  async findCustomerById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const customer = await customerService.findCustomerById(id);
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: 'Cliente não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o cliente por ID' });
    }
  };

  async updateCustomer(req: Request, res: Response): Promise<void> {
    const { name, email, cpf, phone, status } = req.body;
    try {
      if (!name || !email || !cpf || !phone || !status) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      const id = Number(req.params.id);
      const customerData = req.body;
      await customerService.updateCustomer(id, customerData);
      res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o cliente' });
    }
  };

  async deleteCustomer(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await customerService.deleteCustomer(id);
      res.status(200).json({ message: 'Cliente deletado com sucesso!' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o cliente' });
    }
  };
}

export default CustomerController;