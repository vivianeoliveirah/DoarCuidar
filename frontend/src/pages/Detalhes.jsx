import { Link, useLocation } from 'react-router-dom';
import Fundo from '../assets/fundo.png'; // certifique-se que o caminho está correto

export default function Detalhes() {
  const location = useLocation();
  const empresa = location.state?.empresa;
  const erro = location.state?.erro;

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 text-black relative"
      style={{ backgroundImage: `url(${Fundo})` }}
    >
      <Link to="/" className="absolute top-5 left-5 text-green-800 font-bold bg-white/80 px-3 py-1 rounded">
        &#8592; Voltar para a página principal
      </Link>

      <div className="max-w-xl mx-auto bg-white/90 p-6 rounded shadow mt-12">
        <h1 className="text-2xl font-bold mb-4">Detalhes da Empresa</h1>
        {erro ? (
          <p className="text-red-600 font-medium"><strong>Erro:</strong> {erro}</p>
        ) : (
          <>
            <p><strong>Nome:</strong> {empresa?.nomeEmpresarial}</p>
            <p><strong>CNPJ:</strong> {empresa?.ni}</p>
            <p><strong>Telefone:</strong> {empresa?.telefone}</p>
            <p><strong>Atividade Econômica:</strong> {empresa?.cnaePrincipal?.descricao}</p>
            <p><strong>Endereço:</strong> {empresa?.endereco?.logradouro}, {empresa?.endereco?.numero}</p>
          </>
        )}
        <div className="mt-4">
          <Link to="/buscar" className="text-blue-700 underline">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
