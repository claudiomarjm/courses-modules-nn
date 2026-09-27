const prisma = require("./prismaClient");

/**
 * Cria dois cursos e dois modulos, e depois associa alguns deles
 * atraves da tabela intermediaria CoursesModules (relacionamento N:N).
 */
async function main() {
  // 1. Cria os cursos
  const course1 = await prisma.course.create({
    data: { title: "Desenvolvimento Web" },
  });

  const course2 = await prisma.course.create({
    data: { title: "Banco de Dados" },
  });

  // 2. Cria os modulos
  const module1 = await prisma.module.create({
    data: { title: "Introdução ao HTML e CSS" },
  });

  const module2 = await prisma.module.create({
    data: { title: "Modelagem Relacional" },
  });

  // 3. Associa os cursos aos modulos atraves da tabela intermediaria.
  // Repare que "Modelagem Relacional" e associado a AMBOS os cursos,
  // demonstrando o relacionamento N:N (um modulo em varios cursos).
  await prisma.coursesModules.create({
    data: {
      courseId: course1.id,
      moduleId: module1.id,
    },
  });

  await prisma.coursesModules.create({
    data: {
      courseId: course1.id,
      moduleId: module2.id,
    },
  });

  await prisma.coursesModules.create({
    data: {
      courseId: course2.id,
      moduleId: module2.id,
    },
  });

  console.log("Cursos, módulos e associações criados com sucesso!");
  console.log({ course1, course2, module1, module2 });
}

main()
  .catch((e) => {
    console.error("Erro ao criar registros:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
