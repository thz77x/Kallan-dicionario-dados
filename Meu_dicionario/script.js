document.addEventListener('DOMContentLoaded', () => {
    const databaseSchema = [
        {
            name: "categoria",
            desc: "Armazena as categorias para classificação dos produtos no catálogo.",
            columns: [
                { col: "id_categoria", desc: "Identificador único da categoria.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Gerente / Administrador" },
                { col: "nome", desc: "Nome da categoria; não pode se repetir.", type: "VARCHAR(45)", key: "UQ", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro manual de catálogo (RF06)", rbac: "Gerente / Administrador" },
                { col: "descricao", desc: "Detalhamento opcional da categoria.", type: "TEXT", key: "-", null: "NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro manual de catálogo (RF06)", rbac: "Gerente / Administrador" },
                { col: "ativo", desc: "Inativação lógica (1 = ativa, 0 = inativa).", type: "TINYINT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro manual de catálogo (RF06)", rbac: "Gerente / Administrador" }
            ]
        },
        {
            name: "cliente",
            desc: "Armazena os cadastros dos clientes, dados de contato e controle de ativação.",
            columns: [
                { col: "id_cliente", desc: "Identificador único do cliente.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Atendente / Gerente" },
                { col: "nome_completo", desc: "Nome completo do titular.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "cpf_cnpj", desc: "Documento opcional; quando informado deve ser válido e único (RF01).", type: "VARCHAR(45)", key: "UQ", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "telefone", desc: "Telefone de contato opcional.", type: "VARCHAR(45)", key: "-", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "email", desc: "E-mail de contato opcional.", type: "VARCHAR(45)", key: "-", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "ativo", desc: "Inativação lógica; cliente inativo não participa de novas vendas (RN06).", type: "TINYINT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Atendente / Gerente" },
                { col: "data_hora_criacao", desc: "Instante de criação do cadastro.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Atendente / Gerente" }
            ]
        },
        {
            name: "forma_pagamento",
            desc: "Cadastra as formas e meios de pagamento aceitos nas transações.",
            columns: [
                { col: "id_forma_pagamento", desc: "Identificador único da forma de pagamento.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Gerente / Administrador" },
                { col: "codigo", desc: "Código curto e único da forma de pagamento.", type: "VARCHAR(45)", key: "UQ", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro controlado de domínio", rbac: "Gerente / Administrador" },
                { col: "descricao", desc: "Nome exibido da forma de pagamento.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro controlado de domínio", rbac: "Gerente / Administrador" },
                { col: "ativo", desc: "Inativação lógica da forma de pagamento.", type: "TINYINT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro controlado de domínio", rbac: "Gerente / Administrador" }
            ]
        },
        {
            name: "usuario",
            desc: "Controla os operadores, gerentes e administradores do sistema (RBAC).",
            columns: [
                { col: "id_usuario", desc: "Identificador único do usuário.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Administrador" },
                { col: "nome_completo", desc: "Nome do usuário.", type: "VARCHAR(45)", key: "-", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Administração de usuários (RF05)", rbac: "Administrador" },
                { col: "login", desc: "Identificador de acesso; único.", type: "VARCHAR(45)", key: "UQ", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Administração de usuários (RF05)", rbac: "Administrador" },
                { col: "senha_hash", desc: "Hash adaptativo da senha (Argon2id ou bcrypt); nunca texto claro (RNF09).", type: "VARCHAR(255)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Gerado pela aplicação (hash)", rbac: "Somente o serviço de autenticação" },
                { col: "perfil", desc: "Perfil de acesso: ATENDENTE, GERENTE ou ADMINISTRADOR.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Administração de usuários (RF05)", rbac: "Administrador" },
                { col: "ativo", desc: "Inativação lógica; usuário inativo não autentica.", type: "TINYINT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Administração de usuários (RF05)", rbac: "Administrador" },
                { col: "data_hora_criacao", desc: "Instante de criação do usuário.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Administrador" }
            ]
        },
        {
            name: "endereco",
            desc: "Armazena os endereços associados aos clientes cadastrados.",
            columns: [
                { col: "id_endereco", desc: "Identificador único do endereço.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Atendente / Gerente" },
                { col: "id_cliente", desc: "Cliente dono do endereço.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela cliente", rbac: "Atendente / Gerente" },
                { col: "logradouro", desc: "Rua, avenida ou similar.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "numero", desc: "Número do imóvel.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "complemento", desc: "Complemento opcional.", type: "VARCHAR(45)", key: "-", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "bairro", desc: "Bairro.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "cep", desc: "Código de endereçamento postal.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "cidade", desc: "Cidade.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "uf", desc: "Sigla da unidade federativa (2 letras).", type: "CHAR(2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" },
                { col: "ativo", desc: "Inativação lógica do endereço.", type: "TINYINT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro de cliente (RF01)", rbac: "Atendente / Gerente" }
            ]
        },
        {
            name: "produto",
            desc: "Cadastro geral dos produtos vinculados às categorias.",
            columns: [
                { col: "id_produto", desc: "Identificador único do produto.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Gerente / Administrador" },
                { col: "id_categoria", desc: "Categoria do produto.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela categoria", rbac: "Gerente / Administrador" },
                { col: "descricao", desc: "Descrição comercial do produto.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro de catálogo (RF03)", rbac: "Gerente / Administrador" },
                { col: "marca", desc: "Marca do produto, opcional.", type: "VARCHAR(45)", key: "-", null: "NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro de catálogo (RF03)", rbac: "Gerente / Administrador" },
                { col: "ativo", desc: "Produto inativo não pode ser vendido (RN06).", type: "TINYINT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro de catálogo (RF03)", rbac: "Gerente / Administrador" }
            ]
        },
        {
            name: "registro_consentimento",
            desc: "Registra o consentimento do titular por finalidade e versão do termo. Usada apenas quando o consentimento for a base legal aplicável (PR03).",
            columns: [
                { col: "id_registro_consentimento", desc: "Identificador único do registro de consentimento.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Administrador / Responsável autorizado" },
                { col: "id_cliente", desc: "Titular que consentiu.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Tabela cliente", rbac: "Administrador / Responsável autorizado" },
                { col: "finalidade", desc: "Finalidade do tratamento consentido.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Registro de consentimento (RF09)", rbac: "Administrador / Responsável autorizado" },
                { col: "versao_termo", desc: "Versão do termo aceito.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Registro de consentimento (RF09)", rbac: "Administrador / Responsável autorizado" },
                { col: "data_hora_registro", desc: "Instante do registro do consentimento.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Administrador / Responsável autorizado" },
                { col: "estado", desc: "Estado do consentimento (domínio a ser aprovado).", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Registro de consentimento (RF09)", rbac: "Administrador / Responsável autorizado" },
                { col: "evidencia", desc: "Evidência do aceite; acesso restrito.", type: "TEXT", key: "-", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Aplicação (captura do aceite)", rbac: "Administrador / Responsável autorizado" }
            ]
        },
        {
            name: "solicitacao_titular",
            desc: "Solicitações de titulares de dados (acesso, correção, etc.), com estado e decisão. Armazena metadados mínimos do pedido.",
            columns: [
                { col: "id_solicitacao_titular", desc: "Identificador único da solicitação.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Administrador / Responsável autorizado" },
                { col: "id_cliente", desc: "Titular que abriu a solicitação, quando identificado.", type: "BIGINT", key: "FK", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Tabela cliente", rbac: "Administrador / Responsável autorizado" },
                { col: "tipo_solicitacao", desc: "Tipo do direito exercido.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Atendimento a titulares (RF09, PR04)", rbac: "Administrador / Responsável autorizado" },
                { col: "data_hora_abertura", desc: "Instante de abertura.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Administrador / Responsável autorizado" },
                { col: "finalidade", desc: "Finalidade do tratamento a que se refere.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Atendimento a titulares (RF09, PR04)", rbac: "Administrador / Responsável autorizado" },
                { col: "situacao", desc: "Estado atual da solicitação.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Atendimento a titulares (RF09, PR04)", rbac: "Administrador / Responsável autorizado" },
                { col: "decisao", desc: "Decisão tomada sobre a solicitação.", type: "TEXT", key: "-", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Responsável autorizado", rbac: "Administrador / Responsável autorizado" },
                { col: "data_hora_conclusao", desc: "Instante de conclusão.", type: "DATETIME", key: "-", null: "NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Administrador / Responsável autorizado" }
            ]
        },
        {
            name: "variacao_produto",
            desc: "Gerencia SKU, tamanho, cor, preço de tabela e saldo em estoque.",
            columns: [
                { col: "id_variacao_produto", desc: "Identificador único da variação.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Gerente / Administrador" },
                { col: "id_produto", desc: "Produto ao qual a variação pertence.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela produto", rbac: "Gerente / Administrador" },
                { col: "sku", desc: "Código único da variação (RN08).", type: "VARCHAR(45)", key: "UQ", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro de catálogo (RF03)", rbac: "Gerente / Administrador" },
                { col: "tamanho", desc: "Tamanho do calçado.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro de catálogo (RF03)", rbac: "Gerente / Administrador" },
                { col: "cor", desc: "Cor do calçado.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro de catálogo (RF03)", rbac: "Gerente / Administrador" },
                { col: "preco_tabela", desc: "Preço de tabela vigente; deve ser maior que zero.", type: "DECIMAL(10,2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro; alterações em historico_preco", rbac: "Gerente / Administrador" },
                { col: "saldo_estoque", desc: "Saldo atual; nunca negativo (RN04).", type: "INT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Atualizado por movimentacao_estoque (RN07)", rbac: "Somente via transação do sistema" },
                { col: "ativo", desc: "Variação inativa não pode ser vendida (RN06).", type: "TINYINT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cadastro de catálogo (RF03)", rbac: "Gerente / Administrador" }
            ]
        },
        {
            name: "venda",
            desc: "Armazena o cabeçalho das transações de venda realizadas.",
            columns: [
                { col: "id_venda", desc: "Identificador único da venda.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "id_cliente", desc: "Cliente da venda; nulo quando não exigido (RN02).", type: "BIGINT", key: "FK", null: "NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela cliente", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "id_usuario", desc: "Atendente responsável pela venda.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Usuário autenticado", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "id_forma_pagamento", desc: "Forma de pagamento registrada.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Seleção no atendimento", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "data_hora_venda", desc: "Instante da venda.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "modalidade_compra", desc: "Modalidade da compra (ex.: presencial); relevante ao CDC (PR02).", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Registro e finalização de venda (RF02)", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "situacao", desc: "ABERTO, FINALIZADO ou CANCELADO (RN10).", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Registro e finalização de venda (RF02)", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "valor_bruto", desc: "Soma de quantidade x preço unitário dos itens (RN05).", type: "DECIMAL(12,2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Calculado a partir de item_venda", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "valor_desconto", desc: "Desconto total; não negativo e no máximo o valor bruto (RN05).", type: "DECIMAL(12,2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Desconto autorizado", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "valor_total", desc: "Valor líquido = bruto - desconto (RN05).", type: "DECIMAL(12,2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Calculado na finalização", rbac: "Atendente (registro); Gerente / Administrador (consulta)" },
                { col: "data_cancelamento", desc: "Instante do cancelamento, quando houver.", type: "DATETIME", key: "-", null: "NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Processo de cancelamento (RF08)", rbac: "Atendente (registro); Gerente / Administrador (consulta)" }
            ]
        },
        {
            name: "historico_solicitacao_titular",
            desc: "Histórico de tratamento de cada solicitação de titular, com situação, descrição e evidência de resposta.",
            columns: [
                { col: "id_historico_solicitacao_titular", desc: "Identificador único do evento de histórico.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Administrador / Responsável autorizado" },
                { col: "id_solicitacao_titular", desc: "Solicitação tratada.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela solicitacao_titular", rbac: "Administrador / Responsável autorizado" },
                { col: "id_usuario", desc: "Usuário que tratou; nulo em evento automático.", type: "BIGINT", key: "FK", null: "NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Usuário autenticado", rbac: "Administrador / Responsável autorizado" },
                { col: "data_hora_registro", desc: "Instante do registro.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Administrador / Responsável autorizado" },
                { col: "situacao", desc: "Situação da solicitação neste evento.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Atendimento a titulares (RF09)", rbac: "Administrador / Responsável autorizado" },
                { col: "descricao_tratamento", desc: "Descrição do tratamento realizado.", type: "TEXT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Responsável autorizado", rbac: "Administrador / Responsável autorizado" },
                { col: "evidencia_resposta", desc: "Referência protegida da resposta ao titular.", type: "TEXT", key: "-", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Responsável autorizado", rbac: "Administrador / Responsável autorizado" }
            ]
        },
        {
            name: "item_venda",
            desc: "Registra os itens individuais comercializados em cada venda.",
            columns: [
                { col: "id_item_venda", desc: "Identificador único do item.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Atendente / Gerente" },
                { col: "id_venda", desc: "Venda à qual o item pertence.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela venda", rbac: "Atendente / Gerente" },
                { col: "id_variacao_produto", desc: "Variação vendida.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Seleção no atendimento", rbac: "Atendente / Gerente" },
                { col: "quantidade", desc: "Quantidade vendida; maior que zero (RN01).", type: "INT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Registro e finalização de venda (RF02)", rbac: "Atendente / Gerente" },
                { col: "preco_unitario_venda", desc: "Preço aplicado, copiado da variação; não é recalculado depois (RN03).", type: "DECIMAL(10,2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Copiado de variacao_produto", rbac: "Atendente / Gerente" },
                { col: "desconto_item", desc: "Desconto do item; não negativo (padrão 0).", type: "DECIMAL(10,2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Desconto autorizado", rbac: "Atendente / Gerente" }
            ]
        },
        {
            name: "estorno",
            desc: "Estornos de vendas finalizadas, com motivo, responsável e valor. Não pode duplicar a recomposição de estoque (RF08).",
            columns: [
                { col: "id_estorno", desc: "Identificador único do estorno.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Gerente / Administrador" },
                { col: "id_venda", desc: "Venda estornada.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela venda", rbac: "Gerente / Administrador" },
                { col: "id_usuario", desc: "Usuário responsável pelo estorno.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Usuário autenticado", rbac: "Gerente / Administrador" },
                { col: "data_hora_estorno", desc: "Instante do estorno.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Gerente / Administrador" },
                { col: "motivo", desc: "Motivo do estorno.", type: "TEXT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Informado pelo responsável", rbac: "Gerente / Administrador" },
                { col: "valor_estornado", desc: "Valor devolvido; compatível com a venda.", type: "DECIMAL(12,2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cancelamento e estorno (RF08)", rbac: "Gerente / Administrador" },
                { col: "situacao", desc: "Estado do estorno (domínio a ser aprovado).", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Cancelamento e estorno (RF08)", rbac: "Gerente / Administrador" }
            ]
        },
        {
            name: "historico_preco",
            desc: "Registra cada alteração do preço de tabela de uma variação, com vigência e responsável.",
            columns: [
                { col: "id_historico_preco", desc: "Identificador único do registro de preço.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Gerente / Administrador" },
                { col: "id_variacao_produto", desc: "Variação cujo preço mudou.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela variacao_produto", rbac: "Gerente / Administrador" },
                { col: "preco_anterior", desc: "Preço antes da alteração.", type: "DECIMAL(10,2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Copiado de variacao_produto", rbac: "Gerente / Administrador" },
                { col: "preco_novo", desc: "Preço após a alteração.", type: "DECIMAL(10,2)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Informado pelo gerente", rbac: "Gerente / Administrador" },
                { col: "data_hora_vigencia", desc: "Instante em que o novo preço passa a valer.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Gerente / Administrador" },
                { col: "id_usuario", desc: "Usuário que alterou o preço.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Usuário autenticado", rbac: "Gerente / Administrador" }
            ]
        },
        {
            name: "movimentacao_estoque",
            desc: "Registra todas as entradas, saídas, baixas de vendas e ajustes de estoque.",
            columns: [
                { col: "id_movimentacao_estoque", desc: "Identificador único da movimentação.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Gerente / Administrador" },
                { col: "id_variacao_produto", desc: "Variação movimentada.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela variacao_produto", rbac: "Gerente / Administrador" },
                { col: "id_usuario", desc: "Usuário responsável.", type: "BIGINT", key: "FK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Usuário autenticado", rbac: "Gerente / Administrador" },
                { col: "id_venda", desc: "Venda de origem, quando houver.", type: "BIGINT", key: "FK", null: "NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela venda", rbac: "Gerente / Administrador" },
                { col: "id_estorno", desc: "Estorno de origem, quando houver.", type: "BIGINT", key: "FK", null: "NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Tabela estorno", rbac: "Gerente / Administrador" },
                { col: "tipo", desc: "ENTRADA, SAIDA, AJUSTE_POSITIVO, AJUSTE_NEGATIVO, BAIXA_VENDA ou ESTORNO_VENDA.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Operações de estoque e venda (RF03, RF08, RN07)", rbac: "Gerente / Administrador" },
                { col: "quantidade", desc: "Quantidade positiva; o sentido deriva do tipo.", type: "INT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Operações de estoque e venda (RF03, RF08, RN07)", rbac: "Gerente / Administrador" },
                { col: "data_hora_movimentacao", desc: "Instante da movimentação.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Gerente / Administrador" },
                { col: "motivo", desc: "Motivo da movimentação.", type: "TEXT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Informado pelo responsável", rbac: "Gerente / Administrador" }
            ]
        },
        {
            name: "log_auditoria",
            desc: "Trilha de auditoria append-only para registro de operações sensíveis (COBIT/LGPD).",
            columns: [
                { col: "id_log_auditoria", desc: "Identificador único do evento.", type: "BIGINT", key: "PK", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo sistema", rbac: "Administrador (somente leitura)" },
                { col: "id_usuario", desc: "Autor do evento; nulo para evento de sistema.", type: "BIGINT", key: "FK", null: "NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Usuário autenticado", rbac: "Administrador (somente leitura)" },
                { col: "tabela_afetada", desc: "Nome da tabela afetada.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Eventos da aplicação (RN09)", rbac: "Administrador (somente leitura)" },
                { col: "id_registro_afetado", desc: "Identificador do registro afetado (referência lógica, sem FK).", type: "BIGINT", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Eventos da aplicação (RN09)", rbac: "Administrador (somente leitura)" },
                { col: "operacao", desc: "Operação realizada (ex.: INSERT, UPDATE).", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Eventos da aplicação (RN09)", rbac: "Administrador (somente leitura)" },
                { col: "data_hora_registro", desc: "Instante do evento.", type: "DATETIME", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Gerado pelo servidor", rbac: "Administrador (somente leitura)" },
                { col: "valor_anterior", desc: "Estado anterior em JSON, somente quando aplicável e mascarado.", type: "JSON", key: "-", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Captura da aplicação", rbac: "Administrador (somente leitura)" },
                { col: "valor_novo", desc: "Novo estado em JSON, somente quando aplicável e mascarado.", type: "JSON", key: "-", null: "NULL", lgpd: "<span class='tag-dp'>[DP]</span>", lineage: "Captura da aplicação", rbac: "Administrador (somente leitura)" },
                { col: "id_correlacao", desc: "Identificador que correlaciona eventos de uma mesma operação.", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Aplicação", rbac: "Administrador (somente leitura)" },
                { col: "resultado", desc: "Resultado da operação (sucesso ou falha).", type: "VARCHAR(45)", key: "-", null: "NOT NULL", lgpd: "<span class='tag-na'>[N/A]</span>", lineage: "Eventos da aplicação (RN09)", rbac: "Administrador (somente leitura)" }
            ]
        }
    ];

    const container = document.getElementById('tables-container');

    databaseSchema.forEach(table => {
        const card = document.createElement('div');
        card.className = 'table-card';
        card.setAttribute('data-table-name', table.name);

        let rowsHtml = table.columns.map(c => {
            let keyBadge = '';
            if (c.key === 'PK') keyBadge = '<span class="pk">PK</span>';
            else if (c.key === 'UQ') keyBadge = '<span class="uq">UQ</span>';
            else if (c.key === 'FK') keyBadge = '<span class="pk" style="background-color:#0284c7">FK</span>';
            else keyBadge = '-';

            return `
                <tr>
                    <td><code>${c.col}</code></td>
                    <td>${c.desc}</td>
                    <td><code>${c.type}</code></td>
                    <td><b>${keyBadge}</b></td>
                    <td>${c.lgpd}</td>
                    <td>${c.lineage}</td>
                    <td>${c.rbac}</td>
                </tr>
            `;
        }).join('');

        card.innerHTML = `
            <div class="table-header">
                <h3><i class="fa-solid fa-table"></i> ${table.name}</h3>
                <span class="badge-engine">InnoDB</span>
            </div>
            <p class="table-desc">${table.desc}</p>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Atributo</th>
                            <th>Descrição / Regra de Negócio</th>
                            <th>Tipo e Tamanho</th>
                            <th>Constraints</th>
                            <th>Privacidade (LGPD)</th>
                            <th>Linhagem (Lineage)</th>
                            <th>Acesso (RBAC)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        `;
        container.appendChild(card);
    });

    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const tableCards = document.querySelectorAll('.table-card');

        tableCards.forEach(card => {
            const tableName = card.getAttribute('data-table-name').toLowerCase();
            if (term === '' || tableName.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    const downloadBtn = document.getElementById('download-doc-btn');
    downloadBtn.addEventListener('click', () => {
        const pdfPath = 'docs/Especificacao_Requisitos_Regras_Negocio_Kallan_no_Molde.pdf';
        
        fetch(pdfPath, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                    window.open(pdfPath, '_blank');
                } else {
                    generateTextFallback();
                }
            })
            .catch(() => {
                generateTextFallback();
            });
    });

    function generateTextFallback() {
        const content = `
================================================================================
DOCUMENTO DE ESPECIFICAÇÃO DE REQUISITOS E REGRAS DE NEGÓCIO - KALLAN CALÇADOS
================================================================================
Projeto: Sistema de Gestão Operacional e Vendas
Instituição: UNICID - Análise e Desenvolvimento de Sistemas
Grupo: 5 | Professor: Dr. Diego Marques de Carvalho

1. VISÃO GERAL DO ESCOPO
--------------------------------------------------------------------------------
Solução acadêmica voltada ao controle de clientes, catálogo de calçados, variações 
de tamanho e cor, estoque e vendas transacionais.

2. REQUISITOS FUNCIONAIS (RF)
- RF01: Cadastro de Clientes (Atendente / Gerente)
- RF02: Registro e Finalização de Venda com transações atômicas
- RF03: Gestão do Catálogo e Estoque (Gerente / Administrador)
- RF04: Consulta do Histórico de Vendas

3. REQUISITOS NÃO FUNCIONAIS (RNF)
- RNF01: Segurança e controle de acesso baseado em perfis (RBAC)
- RNF05: Integridade transacional estipulada pelas propriedades ACID
- RNF07: Utilização de SGBD relacional MySQL com codificação UTF-8
================================================================================
        `;

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Especificacao_Requisitos_Kallan_Calcados.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const modal = document.getElementById('der-modal');
    const openBtn = document.getElementById('open-der-modal');
    const closeBtn = document.getElementById('close-modal');
    const derImage = document.getElementById('der-image');
    
    let panzoomInstance = null;

    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        if (!panzoomInstance) {
            panzoomInstance = Panzoom(derImage, {
                maxScale: 6,
                minScale: 0.2,
                contain: false
            });
            derImage.parentElement.addEventListener('wheel', panzoomInstance.zoomWithWheel);
        }
        setTimeout(() => {
            panzoomInstance.reset();
        }, 50);
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('zoom-in').addEventListener('click', () => {
        if (panzoomInstance) panzoomInstance.zoomIn();
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
        if (panzoomInstance) panzoomInstance.zoomOut();
    });

    document.getElementById('reset-zoom').addEventListener('click', () => {
        if (panzoomInstance) panzoomInstance.reset();
    });
    const themeBtn = document.getElementById('theme-toggle');
    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        themeBtn.innerHTML = theme === 'dark'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    };
    let savedTheme = null;
    try { savedTheme = localStorage.getItem('theme'); } catch (e) { savedTheme = null; }
    applyTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    themeBtn.addEventListener('click', () => {
        const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (e) { /* ignora */ }
    });
});
