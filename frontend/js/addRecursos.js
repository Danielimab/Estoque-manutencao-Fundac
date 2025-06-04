// Arquivo para gerenciar a adição de recursos
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const userId = localStorage.getItem('userId');
    if (!userId) {
        // Se não estiver logado, redirecionar para a página de login
        window.location.href = 'login.html';
        return;
    }
    
    // Referência ao formulário de adição de recursos
    const resourceForm = document.getElementById('resourceForm');
    
    if (resourceForm) {
        resourceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter os valores do formulário
            const nome = document.getElementById('name').value;
            const unidade_medida = document.getElementById('unidade').value;
            const quantidade = document.getElementById('quantity').value;
            
            // Validação básica
            if (!nome || !unidade_medida || !quantidade) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            // Enviar requisição para o backend
            fetch('http://localhost:3000/api/recursos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    unidade_medida: unidade_medida,
                    quantidade: parseFloat(quantidade )
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao adicionar recurso');
                }
                return response.json();
            })
            .then(data => {
                // Recurso adicionado com sucesso
                console.log('Recurso adicionado:', data);
                alert('Recurso adicionado com sucesso!');
                
                // Limpar o formulário
                resourceForm.reset();
            })
            .catch(error => {
                console.error('Erro ao adicionar recurso:', error);
                alert('Erro ao adicionar recurso: ' + error.message);
            });
        });
    }
});
