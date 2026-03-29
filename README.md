# Service Desk System

Sistema web de abertura e gerenciamento de chamados de suporte técnico, desenvolvido com Angular 21 e PrimeNG 21.

---

## Requisitos

- Node.js 18+
- NPM 9+
- Angular CLI (opcional — veja instruções abaixo)

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/service-desk-system.git
cd service-desk-system
npm install
```

---

## Rodando o projeto

### Opção 1 — Com Angular CLI instalado globalmente

```bash
npm install -g @angular/cli
ng serve
```

### Opção 2 — Sem Angular CLI global (usando apenas o do projeto)

```bash
npx ng serve
```

A aplicação estará disponível em `http://localhost:4200`.

---

## Rodando a API fake (json-server)

Em um segundo terminal, rode:

```bash
npm run mock-api
```

A API estará disponível em `http://localhost:3000`.

---

## Credenciais de acesso

```
Usuário: admin
Senha:   admin
```

---

## Estrutura de pastas

```
src/
└── app/
    ├── core/                          # Lógica central da aplicação
    │   ├── guards/
    │   │   └── auth.guard.ts          # Proteção de rotas privadas
    │   ├── models/
    │   │   └── services-schemas/
    │   │       └── services-schemas.ts # Interfaces e types dos dados
    │   └── services/
    │       ├── auth.service.ts        # Autenticação e persistência de sessão
    │       ├── theme.service.ts       # Controle de tema claro/escuro
    │       └── services.service.ts   # Consumo da API de chamados
    │
    ├── layouts/                       # Estruturas de página
    │   ├── auth-layout/               # Layout para telas públicas (login, erro)
    │   │   └── components/
    │   │       └── navbar/            # Navbar minimalista com botão de tema
    │   └── main-layout/               # Layout para área autenticada
    │       └── components/
    │           ├── navbar/            # Navbar com toggle de sidebar e tema
    │           └── sidebar/           # Menu lateral com colapso automático
    │
    └── screens/                       # Telas da aplicação
        ├── public/                    # Telas acessíveis sem autenticação
        │   └── login/                 # Tela de login
        └── private/                   # Telas protegidas por autenticação
            └── services/              # Gerenciamento de chamados
                └── components/
                    ├── table/         # Tabela de chamados
                    └── dialog/        # Dialog de detalhes do chamado
```

### Decisão sobre componentes internos

Neste projeto optou-se por manter os componentes internos às suas respectivas telas e layouts, sem criar uma pasta `shared/` global de componentes. Essa decisão foi tomada porque o projeto é de escopo menor e nenhum componente de UI foi reutilizado entre telas diferentes. Manter os componentes próximos ao contexto onde são usados facilita a leitura e manutenção do código sem a complexidade de uma camada de compartilhamento desnecessária.

---

## Autenticação e rotas

O sistema usa um `AuthGuard` que verifica a presença de um token no `localStorage` antes de permitir acesso às rotas privadas. Caso o usuário não esteja autenticado, é redirecionado automaticamente para `/login`.

O estado de autenticação é gerenciado pelo `AuthService` com Angular Signals, garantindo reatividade e persistência entre recarregamentos de página.

---

## API fake com json-server

Para simular o consumo de uma API REST sem a necessidade de um backend real, o projeto utiliza o **json-server**. Ele lê o arquivo `db.json` na raiz do projeto e expõe automaticamente endpoints REST completos:

| Método | Endpoint | Ação |
|--------|----------|------|
| GET | /services | Lista todos os chamados |
| GET | /services/:id | Busca chamado por ID |
| POST | /services | Cria novo chamado |
| PATCH | /services/:id | Atualiza parcialmente um chamado |
| DELETE | /services/:id | Remove um chamado |

A grande vantagem do json-server em relação a um mock em memória é a **persistência de dados**: todas as alterações são gravadas diretamente no `db.json`, sobrevivendo a recarregamentos de página. Isso torna o comportamento muito próximo do que seria uma API real durante o desenvolvimento.

---

## PrimeNG

A biblioteca de componentes **PrimeNG 21** foi escolhida pela riqueza de componentes prontos e pela integração nativa com Angular. Os principais benefícios utilizados no projeto foram:

- Componentes completos com acessibilidade e responsividade já embutidos (`p-table`, `p-dialog`, `p-select`, `p-password`, `p-toolbar`, `p-panelMenu`)
- Sistema de temas com suporte a modo claro e escuro via variável CSS `--p-*`, sem necessidade de escrever CSS do zero para a maioria dos elementos
- Preset **Aura** como base visual, com `darkModeSelector: '.app-dark'` para alternância de tema
- Feedback visual nativo em componentes de formulário com estados de validação, loading e mensagens de erro

---

## Bibliotecas externas

### Chart.js

Utilizado para renderização de gráficos e visualizações de dados na área de dashboard. Integrado via CDN e configurado para responder ao tema claro/escuro da aplicação.

### Day.js

Utilizado para tratamento e formatação de datas. Escolhido pela sua leveza (2KB) e API simples em comparação ao Moment.js. Facilita operações como:

```typescript
dayjs(date).format('DD/MM/YYYY HH:mm')
```

Sem o Day.js, o tratamento de datas exigiria código verbose com o objeto nativo `Date` do JavaScript, especialmente para formatação localizada.

---

## Uso de IA no desenvolvimento

Aproximadamente **25% do código** deste projeto foi gerado com auxílio de ferramentas de inteligência artificial — especificamente **Claude (Anthropic)** e **ChatGPT (OpenAI)**. A contribuição da IA foi focada principalmente em:

- Estilizações CSS e ajustes de layout responsivo
- Estrutura inicial de componentes repetitivos
- Configuração de propriedades específicas do PrimeNG
- Sugestões de boas práticas de organização de código Angular

Todo o código gerado foi revisado, adaptado e integrado manualmente ao projeto, garantindo consistência com a arquitetura definida e os requisitos do sistema.

---