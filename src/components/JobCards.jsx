import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobCards = ({ apiData = [], initialPagination = 0 }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(Math.floor(initialPagination / itemsPerPage));

  // Calcula o total de páginas
  const totalPages = Math.ceil(apiData.length / itemsPerPage);
  
  // Obtém os items da página atual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = apiData.slice(startIndex, endIndex);

  // Animação para os cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Gera array com números das páginas a serem exibidas
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Número de páginas a serem mostradas
    let start = Math.max(0, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages - 1, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(0, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const PageButton = ({ children, isActive, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
        ${isActive 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
      `}
    >
      {children}
    </motion.button>
  );

  return (
    <div className="space-y-6">
      {/* Lista de Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {currentItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              exit={{ opacity: 0, y: -20 }}
            >
              <JobCard data={item} pagination={startIndex} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          {/* Botão Anterior */}
          <PageButton
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </PageButton>

          {/* Primeira Página */}
          {getPageNumbers()[0] > 0 && (
            <>
              <PageButton onClick={() => setCurrentPage(0)}>1</PageButton>
              {getPageNumbers()[0] > 1 && (
                <span className="px-2">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </span>
              )}
            </>
          )}

          {/* Páginas Numeradas */}
          {getPageNumbers().map(pageNum => (
            <PageButton
              key={pageNum}
              isActive={currentPage === pageNum}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum + 1}
            </PageButton>
          ))}

          {/* Última Página */}
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <>
              {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 2 && (
                <span className="px-2">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </span>
              )}
              <PageButton onClick={() => setCurrentPage(totalPages - 1)}>
                {totalPages}
              </PageButton>
            </>
          )}

          {/* Botão Próximo */}
          <PageButton
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </PageButton>
        </div>
      )}

      {/* Indicador de Total */}
      <div className="text-center text-sm text-gray-500">
        Mostrando {startIndex + 1}-{Math.min(endIndex, apiData.length)} de {apiData.length} vagas
      </div>
    </div>
  );
};

export default JobCards;