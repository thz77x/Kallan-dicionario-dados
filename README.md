<div align="center">

# 👟 Kallan Calçados — Dicionário de Dados

**Sistema de Gestão Operacional e Vendas**
Projeto acadêmico de Banco de Dados com modelagem relacional, documentação técnica e dicionário de dados interativo.

![MySQL](https://img.shields.io/badge/MySQL-InnoDB-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-222222?style=for-the-badge&logo=github&logoColor=white)

### [🌐 Acessar o Dicionário de Dados online](https://thz77x.github.io/Kallan-dicionario-dados/)

[📖 Sobre](#-sobre-o-projeto) · [✨ Funcionalidades](#-funcionalidades) · [🗄️ Modelo de dados](#️-modelo-de-dados) · [📂 Estrutura](#-estrutura-do-repositório) · [👥 Equipe](#-equipe)

</div>

---

## 📖 Sobre o projeto

Este repositório reúne a parte de **Banco de Dados** do sistema de gestão operacional e vendas da **Kallan Calçados**, varejo de calçados. O projeto foi desenvolvido pelo **Grupo 5** na disciplina de Banco de Dados da **UNICID** (Análise e Desenvolvimento de Sistemas), sob orientação do **Prof. Dr. Diego Carvalho**.

O modelo relacional cobre:

- 👤 Cadastro de **clientes e usuários**
- 👟 **Catálogo de produtos** e variações (SKU, tamanho e cor)
- 📦 Controle de **estoque**
- 🛒 **Vendas**, cancelamentos e estornos
- 💲 **Histórico de preços**
- 🔎 **Trilha de auditoria**
- 🔐 Atendimento a **solicitações de titulares** conforme a LGPD

---

## ✨ Funcionalidades

O dicionário de dados é o ponto único de consulta sobre o significado, a origem, a sensibilidade e o acesso de cada dado do sistema.

| Recurso | Descrição |
| --- | --- |
| 📋 **Identificação do projeto** | Escopo, tecnologia, instituição e responsáveis |
| 🗂️ **16 tabelas documentadas** | Cada coluna traz descrição, tipo, chave (PK/FK/UQ), nulidade, classificação LGPD, linhagem e perfis de acesso (RBAC) |
| 🔍 **Busca em tempo real** | Filtra tabelas e campos enquanto você digita |
| 🧭 **DER interativo** | Modal com o diagrama, zoom por botões (+ / −) ou scroll do mouse, arraste e redefinição (Panzoom.js) |
| 📥 **Download de Requisitos** | Especificação de requisitos e regras de negócio em PDF, direto na página |
| 🏷️ **Classificação LGPD** | **DPS** (dado pessoal sensível), **DP** (dado pessoal) e **N/A** (não aplicável) |
| ⚖️ **Governança** | Alinhado ao **DAMA-DMBOK** (metadados, qualidade e privacidade) e ao **COBIT** (controle, auditoria e responsabilização) |

--- | --- |
| 📋 **Identificação do projeto** | Escopo, tecnologia, instituição e responsáveis |
| 🧭 **DER interativo** | Diagrama Entidade-Relacionamento com botões de zoom (+ / −) e redefinição |
| 📥 **Download de Requisitos** | Documento de requisitos disponível direto na página |
| 🏷️ **Classificação LGPD** | Legenda de sensibilidade: **DPS** (dado pessoal sensível), **DP** (dado pessoal) e **N/A** (não aplicável) |
| ⚖️ **Governança** | Alinhado ao **DAMA-DMBOK** (metadados, qualidade e privacidade) e ao **COBIT** (controle, auditoria e responsabilização) |

---

## 🗄️ Modelo de dados

- **SGBD:** MySQL (InnoDB)
- **Script DDL:** gerado pelo MySQL Workbench
- **Schema:** `mydb` · **16 tabelas**

<div align="center">

![Diagrama Entidade-Relacionamento](https://thz77x.github.io/Kallan-dicionario-dados/assets/der.jpg)

*Diagrama Entidade-Relacionamento (DER) da Kallan Calçados*

</div>

---

## 📂 Estrutura do repositório

```text
Kallan-dicionario-dados/
├── .github/workflows/
│   └── static.yml        # Deploy automático no GitHub Pages
├── assets/
│   └── der.jpg           # Diagrama Entidade-Relacionamento
├── docs/
│   └── Especificacao_Requisitos_Regras_Negocio_BD.pdf
├── index.html            # Página do dicionário
├── script.js             # Dados das tabelas, busca e modal do DER
├── style.css             # Estilos
└── README.md
```

---

## 🚀 Como usar

**Online:** https://thz77x.github.io/Kallan-dicionario-dados/

**Localmente:**

```bash
# 1. Clone o repositório
git clone https://github.com/thz77x/Kallan-dicionario-dados.git

# 2. Entre na pasta do projeto
cd Kallan-dicionario-dados

# 3. Abra o index.html no navegador
#    (ou use a extensão Live Server do VS Code)
```

---

## 🛠️ Tecnologias

- **MySQL / MySQL Workbench** — modelagem e script DDL
- **HTML5, CSS3 e JavaScript** — interface do dicionário
- **Panzoom.js** — zoom e navegação no DER
- **GitHub Actions + GitHub Pages** — publicação automática a cada push na `main`

---

## 👥 Equipe

**Grupo 5** — UNICID · Disciplina de Banco de Dados · Prof. Dr. Diego Carvalho

| Integrante | Papel |
| --- | --- |
| Arthur Caferro Saldanha | Data Owner — regras de negócio e representação do cliente |
| Sander Lima Alves | Data Owner — coordenação e decisões gerais sobre os dados |
| Lucas Victor Soares de Gois | Data Steward — levantamento e organização dos requisitos |
| Matheus Augusto Assunção Novaes | Data Steward — modelagem e estruturação do banco de dados |
| Paulo Gabriel Kiyoshi Inazawa | Data Steward — implementação SQL e integridade dos dados |
| Guilherme de Bastos Santana | Data Steward — qualidade, validação e documentação dos dados |

---

<div align="center">

© 2026 Kallan Calçados — Grupo 5 · Projeto de fins educacionais

</div>
