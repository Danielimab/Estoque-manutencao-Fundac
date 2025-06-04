// Arquivo para gerenciar a transferência de recursos
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const userId = localStorage.getItem('userId');
    if (!userId) {
        // Se não estiver logado, redirecionar para a página de login
        window.location.href = 'login.html';
        return;
    }
    
    // Referência ao formulário de transferência
    const resourceForm = document.getElementById('resourceForm');
    const nameInput = document.getElementById('name');
    const unidadeInput = document.getElementById('unidade');
    const quantityInput = document.getElementById('quantity');
    const localizacaoInput = document.getElementById('localizacao');
    const resourceIdInput = document.getElementById('resourceId');
    const transferButton = document.querySelector('.botao');
    
    // Função para carregar os recursos disponíveis
    function loadResources() {
        fetch('http://localhost:3000/api/recursos' )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar recursos');
                }
                return response.json();
            })
            .then(recursos => {
                // Criar uma lista de opções para o usuário selecionar
                const selectList = document.createElement('select');
                selectList.id = 'resourceSelect';
                selectList.className = 'resource-select';
                
                // Adicionar opção padrão
                const defaultOption = document.createElement('option');
                defaultOption.value = '';
                defaultOption.textContent = 'Selecione um recurso';
                selectList.appendChild(defaultOption);
                
                // Adicionar cada recurso como uma opção
                recursos.forEach(recurso => {
                    const option = document.createElement('option');
                    option.value = recurso.id;
                    option.textContent = `${recurso.nome} (${recurso.quantidade} ${recurso.unidade_medida})`;
                    option.dataset.nome = recurso.nome;
                    option.dataset.unidade = recurso.unidade_medida;
                    option.dataset.quantidade = recurso.quantidade;
                    selectList.appendChild(option);
                });
                
                // Inserir a lista antes do campo de nome
                const nameLabel = document.querySelector('label[for="name"]');
                resourceForm.insertBefore(selectList, nameLabel);
                
                // Adicionar evento de mudança para preencher os campos automaticamente
                selectList.addEventListener('change', function() {
                    const selectedOption = this.options[this.selectedIndex];
                    
                    if (this.value) {
                        resourceIdInput.value = this.value;
                        nameInput.value = selectedOption.dataset.nome;
                        unidadeInput.value = selectedOption.dataset.unidade;
                        // Não preencher a quantidade, pois o usuário deve informar quanto quer transferir
                        quantityInput.value = '';
                        
                        // Habilitar os campos de quantidade e localização
                        quantityInput.disabled = false;
                        localizacaoInput.disabled = false;
                    } else {
                        // Limpar e desabilitar os campos
                        resourceIdInput.value = '';
                        nameInput.value = '';
                        unidadeInput.value = '';
                        quantityInput.value = '';
                        
                        quantityInput.disabled = true;
                        localizacaoInput.disabled = true;
                    }
                });
                
                // Inicialmente, desabilitar os campos
                nameInput.disabled = true;
                unidadeInput.disabled = true;
                quantityInput.disabled = true;
                localizacaoInput.disabled = true;
            })
            .catch(error => {
                console.error('Erro ao carregar recursos:', error);
                alert('Erro ao carregar recursos: ' + error.message);
            });
    }
    
    // Carregar recursos ao iniciar a página
    loadResources();
    
    // Adicionar evento de clique ao botão de transferência
    if (transferButton) {
        transferButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const recursoId = resourceIdInput.value;
            const quantidade = quantityInput.value;
            const localizacao = localizacaoInput.value;
            
            // Validação básica
            if (!recursoId || !quantidade || !localizacao) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            // Enviar requisição para o backend
            fetch('http://localhost:3000/api/transferencias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario_id: parseInt(userId ),
                    recurso_id: parseInt(recursoId),
                    quantidade_transferida: parseFloat(quantidade),
                    localizacao: localizacao
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao registrar transferência');
                }
                return response.json();
            })
            .then(data => {
                // Transferência registrada com sucesso
                console.log('Transferência registrada:', data);
                alert('Transferência registrada com sucesso!');
                
                // Limpar o formulário e recarregar os recursos
                resourceForm.reset();
                
                // Remover o select antigo
                const oldSelect = document.getElementById('resourceSelect');
                if (oldSelect) {
                    oldSelect.remove();
                }
                
                // Recarregar os recursos
                loadResources();
            })
            .catch(error => {
                console.error('Erro ao registrar transferência:', error);
                alert('Erro ao registrar transferência: ' + error.message);
            });
        });
    }
});
