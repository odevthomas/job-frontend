import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import axios from 'axios';

const MainPage = () => {
  const [busca, setBusca] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [periodoIntegral, setPeriodoIntegral] = useState(false);
  const [vagas, setVagas] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const locaisPadroes = [
    'Brasil',
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte'
  ];

  const buscarVagas = async (e) => {
    if (e) e.preventDefault();
    setCarregando(true);
    
    const queryPadrao = busca || 'Desenvolvedor Full Stack';
    const localPadrao = localidade || 'Brasil';

    try {
      const resposta = await axios.get('https://jsearch.p.rapidapi.com/search', {
        params: {
          query: `${queryPadrao} em ${localPadrao}`,
          page: '1',
          num_pages: '15',
          employment_types: periodoIntegral ? 'FULLTIME' : 'PARTTIME',
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_API_SECRET_KEY,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      });
      setVagas(resposta.data.data);
    } catch (error) {
      setErro(error);
      console.error('Erro ao buscar vagas:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarVagas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">
            Portal de <span className="text-blue-600">Vagas</span>
          </h1>
        </div>
      </div>

      {/* Área de Busca */}
      <div className="bg-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <form onSubmit={buscarVagas} className="bg-white rounded-lg shadow-lg p-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Título, empresas, especialização ou benefícios"
                  className="w-full py-3 outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros */}
          <div className="w-full lg:w-64">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={periodoIntegral}
                    onChange={() => setPeriodoIntegral(!periodoIntegral)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span>Período Integral</span>
                </label>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Localização</h3>
                
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={localidade}
                    onChange={(e) => setLocalidade(e.target.value)}
                    placeholder="Cidade, estado ou país"
                    className="w-full bg-transparent outline-none"
                  />
                </div>

                <div className="space-y-2">
                  {locaisPadroes.map((local) => (
                    <label key={local} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="location"
                        value={local}
                        checked={localidade === local}
                        onChange={(e) => setLocalidade(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>{local}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Vagas */}
          <div className="flex-1">
            {carregando ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : erro ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-red-800 font-medium">Erro ao buscar vagas</h3>
                <p className="mt-2 text-red-600">
                  Não foi possível carregar as vagas no momento. 
                  Por favor, tente novamente mais tarde.
                </p>
              </div>
            ) : vagas?.length > 0 ? (
              <div className="space-y-4">
                {vagas.map((vaga, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <h2 className="font-bold text-lg">{vaga.job_title}</h2>
                    <p className="text-gray-600">{vaga.employer_name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Nenhuma vaga encontrada</h3>
                <p className="text-gray-500">Tente ajustar seus filtros de busca</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;