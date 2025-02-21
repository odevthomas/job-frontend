import React from 'react';
import { ArrowLeft, Globe, Clock, Building2, Briefcase, CheckCircle2, Info } from 'lucide-react';
import { motion } from "framer-motion";

const JobInfoPage = ({ state = {} }) => {
  const {
    job_title,
    employer_name,
    employer_logo,
    employer_website,
    job_employment_type,
    job_country,
    job_description,
    job_highlights = {},
    job_apply_link,
    job_posted_at_timestamp,
    job_offer_expiration_timestamp,
    job_publisher
  } = state.page || {};

  const dataExpiracao = new Date(job_offer_expiration_timestamp * 1000).toLocaleDateString('pt-BR');
  const dataPublicacao = new Date(job_posted_at_timestamp * 1000).toLocaleDateString('pt-BR');
  
  const descricaoFormatada = job_description?.replaceAll("\n\n", "<br/>").replaceAll("•", "-") || '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Portal de Vagas</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 space-y-6"
          >
            {/* Botão Voltar */}
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar para busca</span>
            </button>

            {/* Card de Aplicação */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <h2 className="font-semibold text-gray-900">Como se candidatar</h2>
              
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span>Site da empresa: </span>
                  {employer_website ? (
                    <a href={employer_website} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline">
                      {employer_name}
                    </a>
                  ) : (
                    <span className="text-gray-400">{employer_name}</span>
                  )}
                </p>

                <p className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-400" />
                  <span>Salário: Conforme mercado</span>
                </p>

                <p className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>Publicado por: {job_publisher || 'Não informado'}</span>
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Expira em: {dataExpiracao}</span>
                </p>
              </div>

              <a href={job_apply_link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg
                           hover:bg-blue-700 transition-colors duration-200
                           flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  Candidatar-se agora
                </motion.button>
              </a>
            </div>
          </motion.aside>

          {/* Conteúdo Principal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            {/* Cabeçalho da Vaga */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={employer_logo || '/placeholder.png'}
                  alt={employer_name}
                  className="w-16 h-16 rounded-lg object-contain bg-gray-50"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{job_title}</h1>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full
                                 text-sm font-medium bg-blue-50 text-blue-700">
                      {job_employment_type}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Globe className="w-4 h-4" />
                      {job_country}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      Publicado em {dataPublicacao}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição da Vaga */}
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
              {/* Descrição */}
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Descrição da Vaga
                </h2>
                <div className="prose prose-blue max-w-none"
                     dangerouslySetInnerHTML={{ __html: descricaoFormatada }} />
              </section>

              {/* Destaques */}
              {Object.entries(job_highlights).map(([titulo, items], idx) => (
                <section key={idx}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {titulo}
                  </h2>
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default JobInfoPage;