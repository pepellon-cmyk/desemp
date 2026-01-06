# App: Análise de Desempenho — Alunos de Kitesurf

Aplicação em Python (Streamlit) para visualização de desempenho de alunos de kitesurf usando gráficos radar (spider).

Recursos:
- Gráfico radar por aluno ou múltiplos alunos sobrepostos
- Critérios: controle, comando, bodydrag, contra_vento_prancha, teoria
- Dataset de exemplo com 25 alunos incluído (`students.csv`)
- Upload de CSV próprio com as mesmas colunas
- Filtros, estatísticas e exportação CSV

Como usar (local):
1. Instale dependências:
   - Recomendo usar um ambiente virtual
   - pip install -r requirements.txt

2. Rode a app:
   - streamlit run app.py

Formato do CSV esperado:
- Colunas obrigatórias: `nome`, `controle`, `comando`, `bodydrag`, `contra_vento_prancha`, `teoria`
- Exemplo: `nome,controle,comando,bodydrag,contra_vento_prancha,teoria`

Arquivo de exemplo:
- `students.csv` já presente com 25 alunos de exemplo. Edite-o ou carregue o seu próprio CSV.

Licença: MIT (uso livre para personalização)