import { Users, CreditCard, TrendingUp, Receipt, Plus } from 'lucide-react';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';
import { useLocalData } from '../contexts/SupabaseContext';
import { useMemo, useEffect, useState } from 'react';

export default function Dashboard() {
  const { clients, loans, receipts } = useLocalData();
  const [totalReceived, setTotalReceived] = useState(0);

  // Calculate dashboard stats
  const stats = useMemo(() => {
    const activeLoans = loans.filter(loan => loan.status === 'active').length;
    // Corrigido: soma apenas o campo amount de todos os empréstimos
    const totalLoaned = loans.reduce((sum, loan) => {
      const value = Number(loan.amount);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    
    // Calculate total remaining balance
    const remainingBalance = loans.reduce((sum, loan) => {
      if (loan.status === 'completed') return sum;
      const paidAmount = loan.payments?.reduce((paid, payment) => paid + payment.amount, 0) || 0;
      return sum + (loan.totalAmount - paidAmount);
    }, 0);

    return {
      clientCount: clients.length,
      activeLoans,
      totalLoaned: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalLoaned),
      totalReceived: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceived),
      remainingBalance: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(remainingBalance),
    };
  }, [clients, loans, receipts, totalReceived]);

  useEffect(() => {
    // O total recebido deve ser atualizado sempre que loans OU receipts mudarem
    // pois a exclusão de recibos/pagamentos pode afetar o valor
    const received = receipts.reduce((sum, receipt) => sum + (receipt.amount || 0), 0);
    setTotalReceived(received);
  }, [loans, receipts]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dinheiro Rápido</h1>
        <p className="text-gray-600">Sistema de Controle de Empréstimos e Geração de Recibos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Clientes" 
          value={stats.clientCount} 
          icon={<Users size={24} />} 
          to="/clients"
        />
        <StatCard 
          title="Empréstimos Ativos" 
          value={stats.activeLoans} 
          icon={<CreditCard size={24} />} 
          to="/loans"
          color="secondary"
        />
        <StatCard 
          title="Total Emprestado" 
          value={stats.totalLoaned} 
          icon={<TrendingUp size={24} />} 
          to="/reports"
          color="success"
        />
        <StatCard 
          title="Total Recebido" 
          value={stats.totalReceived} 
          icon={<Receipt size={24} />} 
          to="/receipts"
          color="info"
        />
      </div>

      {/* Financial Summary */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Resumo Financeiro</h2>
          <Link to="/reports" className="text-indigo-600 hover:text-indigo-800 text-sm">
            Ver relatórios completos
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Emprestado</p>
            <p className="text-xl font-semibold text-green-600">{stats.totalLoaned}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Recebido</p>
            <p className="text-xl font-semibold text-blue-600">{stats.totalReceived}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Saldo a Receber</p>
            <p className="text-xl font-semibold text-purple-600">{stats.remainingBalance}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/clients/add" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
            <div className="p-3 rounded-md bg-indigo-100 text-indigo-600 mr-4">
              <Plus size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Novo Cliente</h3>
              <p className="text-sm text-gray-500">Cadastrar um novo cliente</p>
            </div>
          </Link>
          <Link to="/loans/add" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
            <div className="p-3 rounded-md bg-green-100 text-green-600 mr-4">
              <Plus size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Novo Empréstimo</h3>
              <p className="text-sm text-gray-500">Registrar um novo empréstimo</p>
            </div>
          </Link>
          <Link to="/receipts" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
            <div className="p-3 rounded-md bg-blue-100 text-blue-600 mr-4">
              <Receipt size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Recibos</h3>
              <p className="text-sm text-gray-500">Visualizar todos os recibos</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}