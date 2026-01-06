// Critérios de avaliação
const criteria = [
    { name: 'Teoria', key: 'teoria' },
    { name: 'Controle', key: 'controle' },
    { name: 'Comando', key: 'comando' },
    { name: 'Flexibilidade', key: 'flexibilidade' },
    { name: 'Força', key: 'forca' },
    { name: 'Baddrag', key: 'baddrag' },
    { name: 'Prancha', key: 'prancha' },
    { name: 'Contra Vento', key: 'contraVento' }
];

// Dados dos alunos (25 alunos)
const students = [
    { id: 1, name: 'Aluno 1', scores: { teoria: 85, controle: 78, comando: 82, flexibilidade: 75, forca: 88, baddrag: 80, prancha: 76, contraVento: 84 } },
    { id: 2, name: 'Aluno 2', scores: { teoria: 90, controle: 85, comando: 88, flexibilidade: 82, forca: 86, baddrag: 84, prancha: 89, contraVento: 87 } },
    { id: 3, name: 'Aluno 3', scores: { teoria: 72, controle: 68, comando: 70, flexibilidade: 73, forca: 75, baddrag: 71, prancha: 74, contraVento: 69 } },
    { id: 4, name: 'Aluno 4', scores: { teoria: 88, controle: 92, comando: 90, flexibilidade: 85, forca: 89, baddrag: 91, prancha: 87, contraVento: 93 } },
    { id: 5, name: 'Aluno 5', scores: { teoria: 76, controle: 74, comando: 78, flexibilidade: 71, forca: 79, baddrag: 77, prancha: 75, contraVento: 73 } },
    { id: 6, name: 'Aluno 6', scores: { teoria: 83, controle: 80, comando: 85, flexibilidade: 78, forca: 82, baddrag: 81, prancha: 84, contraVento: 80 } },
    { id: 7, name: 'Aluno 7', scores: { teoria: 95, controle: 93, comando: 94, flexibilidade: 90, forca: 92, baddrag: 96, prancha: 91, contraVento: 95 } },
    { id: 8, name: 'Aluno 8', scores: { teoria: 68, controle: 65, comando: 70, flexibilidade: 67, forca: 72, baddrag: 69, prancha: 71, contraVento: 66 } },
    { id: 9, name: 'Aluno 9', scores: { teoria: 81, controle: 77, comando: 79, flexibilidade: 76, forca: 80, baddrag: 78, prancha: 82, contraVento: 79 } },
    { id: 10, name: 'Aluno 10', scores: { teoria: 87, controle: 89, comando: 86, flexibilidade: 84, forca: 88, baddrag: 85, prancha: 90, contraVento: 88 } },
    { id: 11, name: 'Aluno 11', scores: { teoria: 74, controle: 71, comando: 73, flexibilidade: 70, forca: 76, baddrag: 72, prancha: 75, contraVento: 74 } },
    { id: 12, name: 'Aluno 12', scores: { teoria: 91, controle: 88, comando: 90, flexibilidade: 87, forca: 89, baddrag: 92, prancha: 88, contraVento: 91 } },
    { id: 13, name: 'Aluno 13', scores: { teoria: 79, controle: 82, comando: 80, flexibilidade: 78, forca: 81, baddrag: 79, prancha: 83, contraVento: 80 } },
    { id: 14, name: 'Aluno 14', scores: { teoria: 85, controle: 83, comando: 87, flexibilidade: 82, forca: 86, baddrag: 84, prancha: 85, contraVento: 86 } },
    { id: 15, name: 'Aluno 15', scores: { teoria: 70, controle: 68, comando: 72, flexibilidade: 69, forca: 73, baddrag: 71, prancha: 70, contraVento: 68 } },
    { id: 16, name: 'Aluno 16', scores: { teoria: 93, controle: 91, comando: 92, flexibilidade: 89, forca: 94, baddrag: 90, prancha: 93, contraVento: 92 } },
    { id: 17, name: 'Aluno 17', scores: { teoria: 77, controle: 75, comando: 78, flexibilidade: 74, forca: 79, baddrag: 76, prancha: 77, contraVento: 75 } },
    { id: 18, name: 'Aluno 18', scores: { teoria: 86, controle: 84, comando: 88, flexibilidade: 83, forca: 87, baddrag: 85, prancha: 86, contraVento: 84 } },
    { id: 19, name: 'Aluno 19', scores: { teoria: 82, controle: 79, comando: 81, flexibilidade: 77, forca: 83, baddrag: 80, prancha: 82, contraVento: 81 } },
    { id: 20, name: 'Aluno 20', scores: { teoria: 89, controle: 87, comando: 90, flexibilidade: 86, forca: 91, baddrag: 88, prancha: 89, contraVento: 87 } },
    { id: 21, name: 'Aluno 21', scores: { teoria: 75, controle: 73, comando: 76, flexibilidade: 72, forca: 77, baddrag: 74, prancha: 75, contraVento: 73 } },
    { id: 22, name: 'Aluno 22', scores: { teoria: 84, controle: 81, comando: 83, flexibilidade: 80, forca: 85, baddrag: 82, prancha: 84, contraVento: 83 } },
    { id: 23, name: 'Aluno 23', scores: { teoria: 78, controle: 76, comando: 79, flexibilidade: 75, forca: 80, baddrag: 77, prancha: 78, contraVento: 76 } },
    { id: 24, name: 'Aluno 24', scores: { teoria: 92, controle: 90, comando: 93, flexibilidade: 88, forca: 91, baddrag: 89, prancha: 92, contraVento: 90 } },
    { id: 25, name: 'Aluno 25', scores: { teoria: 80, controle: 78, comando: 81, flexibilidade: 77, forca: 82, baddrag: 79, prancha: 80, contraVento: 78 } }
];

let currentStudent = null;
let canvas = null;
let ctx = null;

// Inicializar a aplicação
function init() {
    renderStudentButtons();
    setupRadarChart();
    selectStudent(students[0]);
}

// Renderizar botões dos alunos
function renderStudentButtons() {
    const studentGrid = document.getElementById('studentGrid');
    studentGrid.innerHTML = '';
    
    students.forEach(student => {
        const button = document.createElement('button');
        button.className = 'student-btn';
        button.textContent = student.name;
        button.onclick = () => selectStudent(student);
        studentGrid.appendChild(button);
    });
}

// Selecionar aluno
function selectStudent(student) {
    currentStudent = student;
    
    // Atualizar botões
    const buttons = document.querySelectorAll('.student-btn');
    buttons.forEach((btn, index) => {
        if (students[index].id === student.id) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Atualizar informações
    document.getElementById('studentName').textContent = student.name;
    updateCriteriaList(student);
    updateRadarChart(student);
    updateStats(student);
}

// Atualizar lista de critérios
function updateCriteriaList(student) {
    const criteriaList = document.getElementById('criteriaList');
    criteriaList.innerHTML = '';
    
    criteria.forEach(criterion => {
        const item = document.createElement('div');
        item.className = 'criteria-item';
        
        const name = document.createElement('span');
        name.className = 'criteria-name';
        name.textContent = criterion.name;
        
        const score = document.createElement('span');
        score.className = 'criteria-score';
        score.textContent = `${student.scores[criterion.key]}/100`;
        
        item.appendChild(name);
        item.appendChild(score);
        criteriaList.appendChild(item);
    });
}

// Configurar gráfico radar
function setupRadarChart() {
    canvas = document.getElementById('radarChart');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 600;
    canvas.height = 600;
}

// Desenhar gráfico radar
function drawRadarChart(student) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 80;
    const numCriteria = criteria.length;
    const angleStep = (Math.PI * 2) / numCriteria;
    
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar círculos de grade
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Desenhar linhas radiais e labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < numCriteria; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        
        // Desenhar linha radial
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Desenhar label
        const labelX = centerX + Math.cos(angle) * (maxRadius + 30);
        const labelY = centerY + Math.sin(angle) * (maxRadius + 30);
        ctx.fillText(criteria[i].name, labelX, labelY);
    }
    
    // Desenhar valores de escala
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '12px Arial';
    for (let i = 1; i <= 5; i++) {
        const value = (i * 20).toString();
        ctx.fillText(value, centerX + 5, centerY - (maxRadius / 5) * i);
    }
    
    // Desenhar dados do aluno
    ctx.strokeStyle = 'rgba(0, 212, 255, 1)';
    ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    for (let i = 0; i < numCriteria; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const score = student.scores[criteria[i].key];
        const radius = (score / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Desenhar pontos
    ctx.fillStyle = 'rgba(0, 212, 255, 1)';
    for (let i = 0; i < numCriteria; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const score = student.scores[criteria[i].key];
        const radius = (score / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Adicionar borda branca aos pontos
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.strokeStyle = 'rgba(0, 212, 255, 1)';
        ctx.lineWidth = 3;
    }
}

// Atualizar gráfico radar
function updateRadarChart(student) {
    drawRadarChart(student);
}

// Atualizar estatísticas
function updateStats(student) {
    const scores = Object.values(student.scores);
    const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    
    const criteriaWithScores = criteria.map(c => ({
        name: c.name,
        score: student.scores[c.key]
    }));
    
    const best = criteriaWithScores.reduce((prev, current) => 
        (prev.score > current.score) ? prev : current
    );
    
    const worst = criteriaWithScores.reduce((prev, current) => 
        (prev.score < current.score) ? prev : current
    );
    
    document.getElementById('avgScore').textContent = avg;
    document.getElementById('bestCriteria').textContent = best.name;
    document.getElementById('worstCriteria').textContent = worst.name;
    
    let progressLevel = 'Iniciante';
    if (avg >= 85) progressLevel = 'Avançado';
    else if (avg >= 75) progressLevel = 'Intermediário';
    
    document.getElementById('progress').textContent = progressLevel;
}

// Iniciar aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
