import { Trash2, Edit2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import "./DataTable.css";

export default function DataTable({
  columns,
  data = [],
  onEdit,
  onDelete,
  loading,
  error,
  itemsPerPage = 10,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular paginação
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex]
  );

  // Resetar página quando dados mudarem
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const displayLoading = loading && (
    <div className="loading-indicator">
      <div className="spinner" />
    </div>
  );

  if (error) {
    return (
      <div className="data-table-container">
        <p className="error-message">Erro ao carregar dados: {error}</p>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <div className="table-header">
        <div className="table-info">
          <div className="table-stats">
            <span className="stat-item">
              <strong>{data.length}</strong>{" "}
              {data.length === 1 ? "registro" : "registros"}
            </span>
          </div>
        </div>
        {loading && (
          <div className="data-table-container-loading">{displayLoading}</div>
        )}
      </div>

      {data.length === 0 ? (
        <p className="empty-message">Nenhum registro encontrado</p>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row) => (
                  <tr key={row.id}>
                    {columns.map((col) => (
                      <td key={`${row.id}-${col.key}`}>
                        {col.render
                          ? col.render(row[col.key], row)
                          : row[col.key]}
                      </td>
                    ))}
                    <td className="actions-cell">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => onEdit(row)}
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => {
                          if (
                            window.confirm("Tem certeza que deseja deletar?")
                          ) {
                            onDelete(row.id);
                          }
                        }}
                        title="Deletar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
                Anterior
              </button>

              <div className="pagination-info">
                <span>
                  Página <strong>{currentPage}</strong> de{" "}
                  <strong>{totalPages}</strong>
                </span>
                <span className="pagination-range">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, data.length)}{" "}
                  de {data.length}
                </span>
              </div>

              <button
                className="pagination-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Próxima
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
