-- AlterTable
ALTER TABLE "public"."Todo" ADD COLUMN     "usuarioId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
