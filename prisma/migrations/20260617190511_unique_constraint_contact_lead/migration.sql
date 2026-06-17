/*
  Warnings:

  - A unique constraint covering the columns `[property_id,sender_id]` on the table `contact_leads` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contact_leads_property_id_sender_id_key" ON "contact_leads"("property_id", "sender_id");
