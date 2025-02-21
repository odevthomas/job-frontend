import React from 'react';
import { Clock, Globe, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const JobCard = ({ data = {}, pagination = 1 }) => {
  const {
    employer_logo,
    employer_name = 'Nome da empresa não encontrado',
    job_title = 'Título da vaga não encontrado', 
    job_employment_type = 'Tipo de trabalho não encontrado',
    job_country = 'Localização não encontrada',
    job_posted_at_datetime_utc
  } = data;

  // Formatação da data para o padrão brasileiro
  const date = job_posted_at_datetime_utc 
    ? new Date(job_posted_at_datetime_utc).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : 'Sem data';

  // Componente para logo padrão quando a imagem não existir
  const defaultLogo = (
    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg">
      <Briefcase className="w-8 h-8 text-gray-400" />
    </div>
  );

  // Tradução dos tipos de emprego mais comuns
  const translateJobType = (type) => {
    const translations = {
      'FULL_TIME': 'Tempo Integral',
      'PART_TIME': 'Meio Período',
      'CONTRACTOR': 'Contrato',
      'TEMPORARY': 'Temporário',
      'INTERN': 'Estágio',
      'FREELANCE': 'Freelancer'
    };
    return translations[type] || type;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          
          {/* Logo da Empresa */}
          <div className="flex-shrink-0">
            {employer_logo ? (
              <img
                src={employer_logo}
                alt={employer_name}
                className="w-16 h-16 rounded-lg object-contain bg-gray-50"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.appendChild(defaultLogo);
                }}
              />
            ) : defaultLogo}
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <div className="space-y-3">
              {/* Nome da Empresa */}
              <p className="text-sm font-medium text-gray-500 truncate">
                {employer_name}
              </p>

              {/* Título da Vaga */}
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {job_title}
              </h3>

              {/* Detalhes */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Tipo de Trabalho */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                  {translateJobType(job_employment_type)}
                </span>

                {/* Localização */}
                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <Globe className="w-4 h-4" />
                  <span className="truncate">{job_country}</span>
                </div>

                {/* Data de Publicação */}
                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Publicado em: {date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Borda Gradiente na Base */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      </div>
    </motion.div>
  );
};

export default JobCard;