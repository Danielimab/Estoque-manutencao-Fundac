// Arquivo para gerenciar a autenticação do usuário
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-button');
    
    if (loginForm) {
        loginForm.addEventListener('click', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('login').value;
            const password = document.getElementById('senha').value;
            
            // Validação básica
            if (!username || !password) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            // Enviar requisição para o backend
            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: username,
                    senha: password
                } )
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Credenciais inválidas');
                }
                return response.json();
            })
            .then(data => {
                // Login bem-sucedido
                console.log('Login bem-sucedido:', data);
                
                // Armazenar o ID do usuário no localStorage para uso posterior
                localStorage.setItem('userId', data.userId);
                
                // Redirecionar para a página inicial
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Erro no login:', error);
                alert('Erro no login: ' + error.message);
            });
        });
    }
});
