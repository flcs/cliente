-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");
