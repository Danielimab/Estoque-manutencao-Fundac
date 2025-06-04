// Arquivo para gerenciar a listagem de recursos no dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const userId = localStorage.getItem('userId');
    if (!userId) {
        // Se não estiver logado, redirecionar para a página de login
        window.location.href = 'login.html';
        return;
    }
    
    // Referência à tabela onde os recursos serão exibidos
    const tableBody = document.getElementById('resourcesTableBody');
    
    // Função para carregar os recursos do backend
    function loadResources() {
        // Limpar a tabela antes de adicionar novos dados
        tableBody.innerHTML = '';
        
        // Fazer requisição para o backend
        fetch('http://localhost:3000/api/recursos' )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar recursos');
                }
                return response.json();
            })
            .then(recursos => {
                // Se não houver recursos, exibir mensagem
                if (recursos.length === 0) {
                    const row = document.createElement('tr');
                    row.innerHTML = '<td colspan="3">Nenhum recurso encontrado</td>';
                    tableBody.appendChild(row);
                    return;
                }
                
                // Para cada recurso, criar uma linha na tabela
                recursos.forEach(recurso => {
                    const row = document.createElement('tr');
                    
                    // Criar células para cada propriedade do recurso
                    row.innerHTML = `
                        <td>${recurso.nome}</td>
                        <td>${recurso.unidade_medida}</td>
                        <td>${recurso.quantidade}</td>
                    `;
                    
                    // Adicionar a linha à tabela
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar recursos:', error);
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="3">Erro ao carregar recursos: ${error.message}</td>`;
                tableBody.appendChild(row);
            });
    }
    
    // Carregar recursos ao iniciar a página
    loadResources();
});
