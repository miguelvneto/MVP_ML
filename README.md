# MVP - Predição de Câncer de Pulmão

Este projeto tem como objetivo a construção de um sistema de predição de câncer de pulmão utilizando técnicas de Machine Learning. O modelo é treinado com dados de saúde de indivíduos, e a previsão é feita com base em fatores como idade, gênero, hábitos de fumo, entre outros. O projeto também inclui o salvamento de predições em um banco de dados SQLite.

## Estrutura do Projeto

- **Aquisição da base de dados**: Utilização de um dataset do Kaggle para treinar os modelos de aprendizado de máquina.
- **Treinamento e validação**: Diversos modelos de classificação foram treinados e avaliados para encontrar o modelo com melhor desempenho.
- **Otimização de hiperparâmetros**: Aplicação de GridSearchCV para encontrar os melhores parâmetros para cada modelo.
- **Exportação do modelo**: O pipeline final de maior acurácia é exportado para ser utilizado em produção.
- **Interação com o usuário**: O sistema recebe novos dados de usuários e realiza predições.

## Requisitos

- Python 3.8+
- Bibliotecas: `pandas`, `numpy`, `matplotlib`, `scikit-learn`, `sqlite3`, `pickle`

## Instruções de Uso

### 1. Aquisição da Base de Dados

A base de dados foi obtida do Kaggle. Para baixá-la, execute o seguinte comando no Google Colab:

```bash
!kaggle datasets download -d samuelotiattakorah/lung-cancer-data --unzip
```

Após descompactada, a base de dados será encontrada no seguinte diretório:

```
/content/lung cancer survey.csv
```

### 2. Treinamento do Modelo

O código carrega a base de dados, realiza a padronização e treina diversos modelos de classificação. São utilizados os seguintes modelos:

- K-Nearest Neighbors (KNN)
- Decision Tree (Árvore de Decisão)
- Gaussian Naive Bayes (NB)
- Support Vector Machine (SVM)

Os dados são divididos em treino e teste utilizando o método de holdout, com 80% dos dados para treino e 20% para teste.

### 3. Validação Cruzada e Comparação

Utilizamos validação cruzada com `StratifiedKFold` para garantir a estabilidade das predições. As acurácias dos modelos são comparadas utilizando boxplots.

### 4. Otimização de Hiperparâmetros

Os hiperparâmetros de cada modelo são otimizados utilizando `GridSearchCV` para encontrar as melhores combinações de parâmetros e melhorar a acurácia.

### 5. Exportação do Modelo

Após o treinamento e otimização, o modelo final (pipeline) é exportado como um arquivo `.pkl`:

```python
# Salvando o pipeline
with open('pipeline.pkl', 'wb') as file:
    pickle.dump(melhor_pipeline, file)
```

### 6. Teste do Modelo Exportado

O pipeline treinado pode ser carregado para realizar predições em novos dados fornecidos pelo usuário:

```python
with open('pipeline.pkl', 'rb') as file:
    pipeline = pickle.load(file)
```

## Visualização dos Resultados

Os resultados das comparações de modelos são exibidos em um gráfico boxplot, facilitando a visualização da acurácia dos diferentes modelos.

## Modelo de Maior Acuráciaa

Ao final do processo de otimização, o pipeline de maior acurácia é selecionado e utilizado para as predições.

## Referências

- Dataset utilizado: [Lung Cancer Data - Kaggle](https://www.kaggle.com/datasets/samuelotiattakorah/lung-cancer-data)

---

Este projeto foi desenvolvido como parte de um MVP para Sistemas Inteligentes utilizando Machine Learning.