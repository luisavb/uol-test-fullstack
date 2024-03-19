import { useContext, useEffect } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import StatusBadge from "../components/StatusBadge";
import { FiUser } from "react-icons/fi";


function ListCustomer() {
    const { loading, customers, getCustomers, getOne } = useContext(Context);

    const navigate = useNavigate();

    useEffect(() => {
        if (customers.length === 0) getCustomers();
 
    }, [customers, getCustomers]);

    return (
        <>
            <Header/>
            <div className="container mx-auto p-8">
                <div className="flex items-center border-b-2 border-gray-200 py-2">
                    <FiUser className="text-3xl text-gray-800 mr-2" />
                    <h1 className="text-3xl font-bold">Painel de clientes</h1>
                </div>
                <div className="bg-white h-16 flex items-center justify-between">
                    <h3 className="text-l">Listagem de usuários</h3>
                    <button
                        className="bg-orange-400 text-white font-bold py-2 px-4 shadow mr-4 mb-1 rounded hover:bg-white hover:text-orange-400 hover:buttom-border"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => navigate("/create")}
                    >
                        Novo cliente
                    </button>
                </div>
                <table className="min-w-full">
                <tbody className="w-full h-full text-gray-600 text-sm font-light">
                    {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-3 px-6 text-center">Carregando...</td>
                                </tr>
                                ) : (
                                customers.map((customer) => (
                                    <tr className="border-2 border-gray-200 hover:bg-gray-100" key={customer.id}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex flex-col space-y-2">
                                                <p className="font-medium color-gray-200">{customer.name}</p>
                                                <p className="font-medium">{customer.email}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex flex-col space-y-2">
                                                <p className="font-medium">{customer.cpf}</p>
                                                <p className="font-medium">{customer.phone}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <StatusBadge status={customer.status} />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                className="bg-orange-400 text-white font-bold text-xs px-4 py-2 rounded shadow mr-1 mb-1 hover:text-orange-400 hover:bg-white hover:buttom-border"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                                onClick={() => getOne(Number(customer.id)).then(() => navigate(`/edit/${customer.id}`))}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )
                    }
                </tbody>
                </table>
                <p className="m-2 text-l">Exibindo {customers.length} clientes</p>
            </div>
        </>
    );
}
export default ListCustomer;