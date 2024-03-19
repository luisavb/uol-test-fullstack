import { useNavigate} from 'react-router-dom';
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Context from "../context/Context";
import Header from "../components/Header";
import { Select } from "flowbite-react";
import { FiUser } from "react-icons/fi";
import { IMaskInput } from "react-imask";

function CreateCustomer() {
  const navigate = useNavigate();

  const { addCustomer } = useContext(Context);

  const [name, setName] = useState('');
  const [cpfNumber, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [fields, setFields] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidCpf, setInvalidCpf] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

  console.log(cpfNumber);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = target;
    if (id === 'email') {
      setEmail(value);
      setInvalidEmail(false);
    }
    if (id === 'name') {
      setName(value);
    }
    if (id === 'cpfNumber') {
      setCpf(value);
      setInvalidCpf(false);
    }
    if (id === 'phone') {
      setPhone(value);
      setInvalidPhone(false);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if ( value === "status") {
      setFields(true);
    }
    setStatus(value);
  };

  const validateFields = () => {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    // const regexCPF = /^\d{11}$/g;
    const regexCPF =/^\d{3}\.\d{3}\.\d{3}-\d{2}$/g;
    const regexPhone = /^\(\d{2}\)\d{5}-\d{3,4}$/g; 
    if (!name || !email || !cpfNumber || !phone || !status || status === "status"){
      setFields(true);
    } 
    if (regexPhone.test(phone) === false) {
     
      setInvalidPhone(true);
    }
    if (regexCPF.test(cpfNumber) === false) {
      setInvalidCpf(true);
    } 
    if (regexEmail.test(email) === false) {
      setInvalidEmail(true);
      return false;
    } else {
    return true;
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validateFields() === true) {
      const create = { name: name, email: email, cpf: cpfNumber, phone: phone, status: status };
      addCustomer(create);
    }
  }
    

  return (
    <>
    <Header/>
    <div className="container mx-auto p-8">
      <div className="flex items-center border-b-2 border-gray-200 py-2">
          <FiUser className="text-3xl text-gray-800 mr-2" />
          <h1 className="text-3xl font-bold">Painel de clientes</h1>
      </div>

      <h2 className="text-2xl font-bold my-4">Novo usuário</h2>
      <h3 className="text-md mb-2">Informe os campos a seguir para criar novo usuário:</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <IMaskInput id="name"  
              mask="" 
              placeholder="Nome" 
              onChange={handleChange} 
              className="border-2 border-gray-300 rounded py-2 w-full"/>
          </div>
          <div>
            <IMaskInput id="email"  
                mask="" 
                placeholder="E-mail" 
                onChange={handleChange} 
                className="border-2 border-gray-300 rounded py-2 w-full"/>
                {invalidEmail && <p className="text-red-500 text-xs italic">E-mail inválido</p>}
          </div>
          <div>
            <IMaskInput id="cpfNumber" 
              mask="000.000.000-00" 
              placeholder="CPF" 
              onChange={handleChange} 
              className="border-2 border-gray-300 rounded py-2 w-full"/>
            {invalidCpf && <p className="text-red-500 text-xs italic">CPF inválido</p>}
          </div>
          <div className="form-input w-full border-gray-300 rounded">
            <IMaskInput id="phone" 
              mask="(00)00000-0000" 
              placeholder="Telefone" 
              onChange={handleChange} 
              className="border-2 border-gray-300 rounded py-2 w-full" />
            {invalidPhone && <p className="text-red-500 text-xs italic">Telefone inválido</p>}
          </div>
          <div>
            <Select
              id="status"
              onChange={handleSelect}
              value={status}
              className="form-select w-full border-gray-800 rounded"
            >
              <option value="status">Status</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="Aguardando Ativação">Aguardando Ativação</option>
              <option value="Desativado">Desativado</option>
            </Select>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-150">
              Criar
            </button>
            <button type="button" onClick={() => navigate("/")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition ease-in-out duration-150">
              Voltar
            </button>
          </div>
        </form>
        {fields && <p className="text-red-500 text-xs italic">Todos os campos devem ser preenchidos</p>}
    </div>
    </>
  );
}

export default CreateCustomer;