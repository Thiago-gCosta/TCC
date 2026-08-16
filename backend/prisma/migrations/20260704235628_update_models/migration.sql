/*
  Warnings:

  - Added the required column `atualizadoEm` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `favoritos` ADD COLUMN `ordem` INTEGER NULL;

-- AlterTable
ALTER TABLE `historicos` ADD COLUMN `tipoConversao` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `ativo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `atualizadoEm` DATETIME(3) NOT NULL,
    MODIFY `descricao` VARCHAR(500) NULL;
