const prisma = require("./prismaClient");

/**
 * Consulta os cursos, incluindo seus modulos relacionados atraves
 * da tabela intermediaria. O "include" aninhado e necessario porque
 * a relacao N:N passa por CoursesModules, e nao e direta entre
 * Course e Module.
 */
async function main() {
  const courses = await prisma.course.findMany({
    include: {
      modules: {
        include: {
          module: true, // traz os dados completos do modulo, nao so o vinculo
        },
      },
    },
  });

  console.log("Cursos com seus módulos relacionados:");
  console.log(JSON.stringify(courses, null, 2));

  const modules = await prisma.module.findMany({
    include: {
      courses: {
        include: {
          course: true, // traz os dados completos do curso, nao so o vinculo
        },
      },
    },
  });

  console.log("\nMódulos com seus cursos relacionados:");
  console.log(JSON.stringify(modules, null, 2));
}

main()
  .catch((e) => {
    console.error("Erro ao consultar registros:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
