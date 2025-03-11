// Funções Utilitárias
function exibirElemento(id, display = 'block') {
    document.getElementById(id).style.display = display;
}

function esconderElemento(id) {
    document.getElementById(id).style.display = 'none';
}

// Formulário de Triagem: Validação e Envio
const screeningForm = document.getElementById('screening-form');
screeningForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validação dos dados do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const sintomas = document.getElementById('sintomas').value;

    if (!nome || !cpf || !sintomas) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados para o backend ou banco de dados
    console.log('Dados da triagem:', { nome, cpf, sintomas });

    // Simulação de sucesso (substitua por sua lógica de backend)
    alert('Triagem enviada com sucesso!');

    // Ocultar a triagem, mostrar a barra de carregamento e iniciar o timer
    esconderElemento('triagem');
    exibirElemento('loading-bar');
    iniciarTimer();
});

// Timer e Link da Consulta
const timerContainer = document.getElementById('timer-container');
const timerElement = document.getElementById('timer');
const consultationLink = document.getElementById('consultation-link');
const consultaSection = document.getElementById('consulta');

// Definir o horário agendado da consulta (substitua por sua lógica de agendamento)
let consultaAgendada;

function iniciarTimer() {
    consultaAgendada = new Date();
    consultaAgendada.setMinutes(consultaAgendada.getMinutes() + 30);

    const timerInterval = setInterval(() => {    
        const agora = new Date();
        const diferenca = consultaAgendada - agora; 

        if (diferenca <= 0) {
            clearInterval(timerInterval);
            consultaSection.style.display = 'block'; // Exibir a seção de consulta
            timerContainer.style.display = 'none'; // Ocultar o timer
            consultationLink.style.display = 'block'; // Exibir o link de consulta
            exibirElemento('print-prescription'); // Exibir o botão de impressão de prescrição
        } else {
            const minutos = Math.floor(diferenca / 1000 / 60);
            const segundos = Math.floor((diferenca / 1000) % 60);
            timerElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
        }
    }, 1000);
}