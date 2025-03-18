// Funções Utilitárias
function exibirElemento(id, display = 'block') {
    document.getElementById(id).style.display = display;
}

function esconderElemento(id) {
    document.getElementById(id).style.display = 'none';
}

// Formulário de Triagem: Validação e Geração da Senha
const screeningForm = document.getElementById('screening-form');
screeningForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio do formulário padrão

    // Validação dos dados do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const sintomas = document.getElementById('sintomas').value;

    if (!nome || !cpf || !sintomas) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Lógica de envio (exemplo para backend, se necessário)
    console.log('Dados da triagem:', { nome, cpf, sintomas });

    // Gerar uma senha aleatória para o usuário
    const senha = 'SUS' + Math.floor(1000 + Math.random() * 9000); // Exemplo: SUS1234
    document.getElementById('senha-gerada').textContent = `Sua senha é: ${senha}`;

    // Exibir a barra de carregamento
    esconderElemento('triagem');
    exibirElemento('loading-bar'); // Mostrar a barra de carregamento
    setTimeout(() => {
        esconderElemento('loading-bar'); // Ocultar a barra após 5 segundos
        exibirElemento('mensagem-senha'); // Exibir a mensagem de senha
        iniciarTimer(60); // Inicia o timer com 60 segundos
    }, 5000); // Simula o carregamento por 5 segundos
});

// Timer e Barra de Progresso
function iniciarTimer(duracao) {
    let tempoRestante = duracao;
    const timerElemento = document.getElementById('timer');
    const progressoElemento = document.getElementById('progress-bar');

    const intervalo = setInterval(() => {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;

        // Atualizar o texto do timer
        timerElemento.textContent = `Tempo restante: ${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        // Atualizar a barra de progresso
        const progresso = ((duracao - tempoRestante) / duracao) * 100;
        progressoElemento.style.width = `${progresso}%`;

        tempoRestante--;

        if (tempoRestante < 0) {
            clearInterval(intervalo);
            timerElemento.textContent = 'Seu tempo expirou!';
            progressoElemento.style.width = '100%'; // Progresso completo ao finalizar
        }
    }, 1000);
}
