/*
  Warnings:

  - Made the column `tipoConversao` on table `historicos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `historicos` ADD COLUMN `dadosESP` LONGTEXT NULL,
    MODIFY `tipoConversao` ENUM('TEXTO', 'FAVORITO', 'HISTORICO') NOT NULL DEFAULT 'TEXTO';

-- AlterTable
ALTER TABLE `usuarios` MODIFY `tipoUsuario` ENUM('COMPLETA', 'PARCIAL', 'AUXILIAR', 'NONE') NOT NULL;
