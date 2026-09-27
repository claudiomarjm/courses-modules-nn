const prisma = require("./prismaClient");

/**
 * Remove uma associacao especifica entre um curso e um modulo,
 * apagando o registro da tabela intermediaria CoursesModules.
 * Isso NAO apaga o curso nem o modulo em si, apenas o vinculo entre eles.
 *
 * Ajuste os valores de courseId e moduleId conforme os IDs
 * que apareceram ao rodar "npm run create" ou "npm run query".
 */
const COURSE_ID = 1;
const MODULE_ID = 2;

async function main() {
  const removedLink = await prisma.coursesModules.delete({
    where: {
      courseId_moduleId: {
        courseId: COURSE_ID,
        moduleId: MODULE_ID,
      },
    },
  });

  console.log("Associação removida com sucesso:");
  console.log(removedLink);
}

main()
  .catch((e) => {
    console.error(
      "Erro ao remover associação (confirme se o vínculo existe com esses IDs):",
      e.message
    );
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
