// Arquivo para gerenciar o histórico de transferências
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const userId = localStorage.getItem('userId');
    if (!userId) {
        // Se não estiver logado, redirecionar para a página de login
        window.location.href = 'login.html';
        return;
    }
    
    // Referência à tabela onde o histórico será exibido
    const tableBody = document.getElementById('historicoTableBody');
    
    // Função para formatar a data
    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR');
    }
    
    // Função para carregar o histórico de transferências do backend
    function loadHistorico() {
        // Limpar a tabela antes de adicionar novos dados
        tableBody.innerHTML = '';
        
        // Fazer requisição para o backend
        fetch('http://localhost:3000/api/transferencias' )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar histórico de transferências');
                }
                return response.json();
            })
            .then(transferencias => {
                // Se não houver transferências, exibir mensagem
                if (transferencias.length === 0) {
                    const row = document.createElement('tr');
                    row.innerHTML = '<td colspan="5">Nenhuma transferência encontrada</td>';
                    tableBody.appendChild(row);
                    return;
                }
                
                // Para cada transferência, criar uma linha na tabela
                transferencias.forEach(transferencia => {
                    const row = document.createElement('tr');
                    
                    // Criar células para cada propriedade da transferência
                    row.innerHTML = `
                        <td>${formatarData(transferencia.data_transferencia)}</td>
                        <td>${transferencia.Usuario ? transferencia.Usuario.username : 'N/A'}</td>
                        <td>${transferencia.Recurso ? transferencia.Recurso.nome : 'N/A'}</td>
                        <td>${transferencia.quantidade_transferida} ${transferencia.Recurso ? transferencia.Recurso.unidade_medida : ''}</td>
                        <td>${transferencia.localizacao}</td>
                    `;
                    
                    // Adicionar a linha à tabela
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar histórico:', error);
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="5">Erro ao carregar histórico: ${error.message}</td>`;
                tableBody.appendChild(row);
            });
    }
    
    // Carregar histórico ao iniciar a página
    loadHistorico();
});
