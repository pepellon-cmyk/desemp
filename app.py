#!/usr/bin/env python3
"""
app.py

App Streamlit para análise de desempenho de alunos de kitesurf.
Mostra gráficos radar (spider) para critérios:
- controle
- comando
- bodydrag
- contra_vento_prancha
- teoria

Funcionalidades:
- Carregar CSV com notas (ou usar dataset de exemplo integrado)
- Selecionar 1 ou mais alunos para comparação em gráfico radar
- Mostrar média da turma e tabela de dados
- Exportar CSV filtrado
- Faz deploy local com: `streamlit run app.py`
"""

from pathlib import Path
import io

import streamlit as st
import pandas as pd
import plotly.graph_objects as go

# ====== Configurações ======
CRITERIA = [
    ("controle", "Controle"),
    ("comando", "Comando"),
    ("bodydrag", "Bodydrag"),
    ("contra_vento_prancha", "Contra vento / prancha"),
    ("teoria", "Teoria"),
]
CRITERIA_KEYS = [c[0] for c in CRITERIA]
CRITERIA_LABELS = [c[1] for c in CRITERIA]
EXAMPLE_CSV = Path(__file__).with_name("students.csv")

st.set_page_config(page_title="Análise de Desempenho - Kitesurf", layout="wide")


# ====== Helpers ======
def load_data(uploaded_file):
    """
    Carrega dataframe de um arquivo enviado ou do CSV de exemplo.
    Espera colunas: nome + os CRITERIA_KEYS
    """
    if uploaded_file is not None:
        df = pd.read_csv(uploaded_file)
    else:
        df = pd.read_csv(EXAMPLE_CSV)
    # Normalizar nomes de colunas (lower, sem espaços)
    df = df.rename(columns=lambda s: s.strip())
    # Garantir colunas necessárias
    missing = [k for k in CRITERIA_KEYS if k not in df.columns]
    if missing:
        st.error(f"Arquivo inválido: faltam colunas: {', '.join(missing)}")
        return None
    # Garantir nome da coluna do aluno
    if "nome" not in df.columns and "name" in df.columns:
        df = df.rename(columns={"name": "nome"})
    if "nome" not in df.columns:
        st.error("Arquivo inválido: precisa conter a coluna 'nome' (nome do aluno).")
        return None
    # Converter valores para numéricos
    for k in CRITERIA_KEYS:
        df[k] = pd.to_numeric(df[k], errors="coerce")
    return df


def radar_figure(df_selected, title=""):
    """
    Gera figura Plotly com radar chart.
    df_selected: dataframe contendo as colunas CRITERIA_KEYS e 'nome'
    Se houver múltiplas linhas, sobrepõe cada aluno.
    Adiciona também a média (linha pontilhada).
    """
    categories = CRITERIA_LABELS + [CRITERIA_LABELS[0]]
    fig = go.Figure()
    # Plot each student
    for _, row in df_selected.iterrows():
        values = [row[k] for k in CRITERIA_KEYS]
        values = values + [values[0]]
        fig.add_trace(go.Scatterpolar(
            r=values,
            theta=categories,
            fill='toself',
            name=row["nome"],
            opacity=0.6,
        ))
    # Add class mean
    mean_values = df_selected[CRITERIA_KEYS].mean()
    mean_vals = mean_values.tolist() + [mean_values.iloc[0]]
    fig.add_trace(go.Scatterpolar(
        r=mean_vals,
        theta=categories,
        mode='lines',
        name='Média selecionada',
        line=dict(color='black', dash='dash'),
        hoverinfo='none'
    ))
    fig.update_layout(
        polar=dict(
            radialaxis=dict(visible=True, range=[0, 10]),
        ),
        showlegend=True,
        title=title
    )
    return fig


def download_link(df):
    """
    Retorna bytes para download de CSV do dataframe.
    """
    towrite = io.BytesIO()
    df.to_csv(towrite, index=False)
    towrite.seek(0)
    return towrite


# ====== Interface ======
st.title("Análise de Desempenho — Alunos de Kitesurf")
st.markdown("Visualize notas por critérios com gráficos radar. Faça upload de um CSV ou use os dados de exemplo (25 alunos).")

# Sidebar: upload e configurações
with st.sidebar:
    st.header("Dados")
    uploaded_file = st.file_uploader("Enviar CSV (colunas: nome, " + ", ".join(CRITERIA_KEYS) + ")", type=["csv"])
    df = load_data(uploaded_file)

    if df is None:
        st.stop()

    st.markdown(f"Total de registros: **{len(df)}**")
    st.markdown("Critérios:")
    for k, label in CRITERIA:
        st.write(f"- **{label}** ({k})")

    st.markdown("---")
    st.header("Filtros")
    min_score = st.slider("Nota mínima (filtrar alunos com todas notas >=)", 0, 10, 0)
    only_below = st.checkbox("Mostrar apenas alunos com alguma nota abaixo da média geral", value=False)

# Aplicar filtros
mask = (df[CRITERIA_KEYS] >= min_score).all(axis=1)
filtered = df[mask].copy()

if only_below:
    class_mean = df[CRITERIA_KEYS].mean().mean()
    filtered = filtered[filtered[CRITERIA_KEYS].min(axis=1) < class_mean]

if filtered.empty:
    st.warning("Nenhum aluno após aplicar filtros.")
    st.dataframe(df.head())
    st.stop()

# Seleção de alunos para comparação
st.subheader("Seleção de alunos")
col1, col2 = st.columns([2, 1])
with col1:
    selected = st.multiselect("Escolha um ou mais alunos para comparar (máx 10 por vez)", options=filtered["nome"].tolist(), default=[filtered["nome"].iloc[0]])
with col2:
    compare_avg = st.checkbox("Comparar com média da turma (todas os alunos)", value=True)

if not selected:
    st.warning("Selecione pelo menos um aluno.")
    st.stop()

df_selected = filtered[filtered["nome"].isin(selected)].reset_index(drop=True)

# Mostrar radar
st.subheader("Gráfico Radar (Spider)")
fig = radar_figure(df_selected, title="Comparação de desempenho")
st.plotly_chart(fig, use_container_width=True)

# Mostrar tabela de dados selecionados e estatísticas
st.subheader("Tabela de notas selecionadas")
st.dataframe(df_selected[["nome"] + CRITERIA_KEYS].set_index("nome"))

st.subheader("Estatísticas")
stats = df_selected[CRITERIA_KEYS].agg(["mean", "median", "min", "max"]).T
stats.index = CRITERIA_LABELS
st.table(stats)

# Mostrar média da turma (opcional)
if compare_avg:
    st.subheader("Média da turma (todas os registros carregados)")
    class_mean = df[CRITERIA_KEYS].mean()
    mean_df = pd.DataFrame({"Critério": CRITERIA_LABELS, "Média": class_mean.values})
    st.table(mean_df)

# Download dos dados filtrados/selecao
st.subheader("Exportar dados")
to_download = st.radio("O que exportar?", ("Alunos filtrados", "Alunos selecionados"))
if to_download == "Alunos filtrados":
    download_df = filtered.copy()
else:
    download_df = df_selected.copy()

btn = st.download_button(
    label="Baixar CSV",
    data=download_link(download_df),
    file_name="kitesurf_notas_export.csv",
    mime="text/csv"
)

st.markdown("---")
st.caption("Desenvolvido em Python + Streamlit + Plotly. Edite o CSV de exemplo (students.csv) para personalizar os nomes/valores.")