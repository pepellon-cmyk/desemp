# App: Análise de Desempenho — Alunos de Kitesurf

Sistema de análise de performance para alunos de kitesurf com interface moderna e gráfico radar.

## 🌊 Características

- **25 Alunos**: Sistema configurado para gerenciar 25 alunos
- **8 Critérios de Avaliação** (escala 0-100):
  - Teoria
  - Controle
  - Comando
  - Flexibilidade
  - Força
  - Baddrag
  - Prancha
  - Contra Vento

## 📊 Duas Implementações Disponíveis

### 1. Versão HTML/JavaScript (Standalone)
Interface web moderna que funciona direto no navegador.

**Como usar:**
1. Abra o arquivo `index.html` em um navegador web moderno
2. Clique em qualquer botão de aluno (Aluno 1 a Aluno 25)
3. Visualize o gráfico radar e as estatísticas atualizadas

**Funcionalidades:**
- Gráfico radar desenhado com Canvas API
- Estatísticas em tempo real (média, melhor critério, área a melhorar, nível)
- Design inovador com gradientes e animações
- Totalmente offline - não precisa de servidor

**Tecnologias:**
- HTML5, CSS3, JavaScript puro
- Canvas API para gráfico radar
- Design responsivo

### 2. Versão Python/Streamlit
Aplicação Python interativa com recursos avançados de análise.

**Como usar (local):**
1. Instale as dependências (recomendado usar ambiente virtual):
   ```bash
   pip install -r requirements.txt
   ```

2. Execute a aplicação:
   ```bash
   streamlit run app.py
   ```

**Funcionalidades:**
- Gráfico radar interativo com Plotly
- Comparação de múltiplos alunos sobrepostos
- Upload de CSV personalizado
- Filtros avançados
- Estatísticas detalhadas
- Exportação de dados em CSV
- Visualização de média da turma

**Formato do CSV esperado:**
- Colunas obrigatórias: `nome`, `teoria`, `controle`, `comando`, `flexibilidade`, `forca`, `baddrag`, `prancha`, `contra_vento`
- Valores de 0 a 100 para cada critério
- Arquivo de exemplo: `students.csv` (incluído com 25 alunos)

## 🎨 Design (Versão HTML)

Interface com tema escuro inovador:
- Gradientes animados de fundo
- Cards com efeito glass morphism
- Esquema de cores ciano/azul com efeitos de brilho
- Animações suaves e transições
- Layout responsivo para diferentes dispositivos

## 📝 Licença

MIT (uso livre para personalização)