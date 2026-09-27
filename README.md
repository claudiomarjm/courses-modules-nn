# Relacionamento N:N com Prisma — Courses e Modules

Projeto prático que demonstra um relacionamento **muitos-para-muitos (N:N)** entre as tabelas `Course` e `Module`, usando uma tabela intermediária explícita chamada **`CoursesModules`**, com **Prisma ORM** e **SQLite**.

Um curso pode ter vários módulos, e um módulo pode pertencer a vários cursos — a tabela `CoursesModules` é quem guarda cada uma dessas associações.

## 🧱 Modelo de dados

```prisma
model Course {
  id        Int      @id @default(autoincrement())
  title     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  modules   CoursesModules[]
}

model Module {
  id        Int      @id @default(autoincrement())
  title     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  courses   CoursesModules[]
}

model CoursesModules {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())

  course    Course   @relation(fields: [courseId], references: [id])
  courseId  Int

  module    Module   @relation(fields: [moduleId], references: [id])
  moduleId  Int

  @@unique([courseId, moduleId])
}
```

Usamos uma tabela intermediária **explícita** (em vez do N:N implícito do Prisma) porque o exercício pede para criar, consultar e remover registros diretamente nela.

## 📁 Estrutura do projeto

```
courses-modules-nn/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── prismaClient.js
│   ├── create.js       → Cria cursos, módulos, e associa via tabela intermediária
│   ├── query.js         → Consulta cursos/módulos com include aninhado
│   └── deleteLink.js    → Remove uma associação da tabela intermediária
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd courses-modules-nn
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar as variáveis de ambiente
```bash
cp .env.example .env
```

### 4. Rodar a migração do Prisma (cria o banco SQLite)
```bash
npx prisma migrate dev --name init
```

### 5. Criar os registros e as associações
```bash
npm run create
```

Isso cria 2 cursos, 2 módulos, e 3 associações na tabela intermediária — repare que o módulo "Modelagem Relacional" fica associado aos **dois** cursos, mostrando o N:N na prática.

### 6. Consultar os dados relacionados
```bash
npm run query
```

Mostra cada curso com seus módulos, e cada módulo com seus cursos, usando `include` aninhado (já que a relação passa pela tabela intermediária).

### 7. Remover uma associação
```bash
npm run deleteLink
```

Remove o vínculo entre o curso e o módulo definidos no topo do arquivo `src/deleteLink.js` (ajuste os IDs conforme o que apareceu no passo 5 ou 6). Isso apaga só a linha da tabela `CoursesModules`, sem apagar o curso nem o módulo.

### 8. (Opcional) Visualizar os dados no Prisma Studio
```bash
npx prisma studio
```

## 🛠️ Tecnologias utilizadas

- Node.js
- Prisma ORM
- SQLite
