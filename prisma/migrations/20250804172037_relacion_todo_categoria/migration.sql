-- AlterTable
ALTER TABLE "public"."Todo" ADD COLUMN     "categoriaId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
