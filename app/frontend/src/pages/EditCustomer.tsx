import { useParams, useNavigate} from 'react-router-dom';
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Context from "../context/Context";
import Header from '../components/Header';
import { Select } from "flowbite-react";
import { FiUser } from "react-icons/fi";

function EditCustomer() {
  const { id } = useParams(); console.log(id)
  const navigate = useNavigate();

  const { updCustomer, editCustomer } = useContext(Context);

  const [name, setName] = useState(editCustomer.name);
  const [cpfNumber, setCpf] = useState(editCustomer.cpf);
  const [phone, setPhone] = useState(editCustomer.phone);
  const [email, setEmail] = useState(editCustomer.email);
  const [status, setStatus] = useState(editCustomer.status);
  const [fields, setFields] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidCpf, setInvalidCpf] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);

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
    const regexCPF = /^\d{11}$/g;
    const regexPhone = /^\d{10,11}$/g;
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
      const updates = { id: Number(id), name: name, email: email, cpf: cpfNumber, phone: phone, status: status };
      updCustomer(updates);
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

      <h2 className="text-2xl font-bold my-4">Editar usúario: {editCustomer.name}</h2>
      <h3 className="text-md mb-2">Informe os campos a seguir para editar o usuário:</h3>

      { editCustomer.id === Number(id) && 
      (<>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input id="name" type="text" placeholder={editCustomer.name} onChange={handleChange} className="form-input w-full border-gray-300 rounded" />
          </div>
          <div>
            <input id="email" type="text" placeholder={editCustomer.email} onChange={handleChange} className="form-input w-full border-gray-300 rounded" />
            {invalidEmail && <p className="text-red-500 text-xs italic">E-mail inválido</p>}
          </div>
          <div>
            <input id="cpfNumber" type="text" placeholder={editCustomer.cpf} onChange={handleChange} className="form-input w-full border-gray-300 rounded" />
            {invalidCpf && <p className="text-red-500 text-xs italic">CPF inválido</p>}
          </div>
          <div>
            <input id="phone" type="text" placeholder={editCustomer.phone} onChange={handleChange} className="form-input w-full border-gray-300 rounded" />
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
              Editar
            </button>
            <button type="button" onClick={() => navigate("/")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition ease-in-out duration-150">
              Voltar
            </button>
          </div>
        </form>
        {fields && <p className="text-red-500 text-xs italic">Todos os campos devem ser preenchidos</p>}
      </>
    )}
  
  </div> </>)
}

export default EditCustomer;