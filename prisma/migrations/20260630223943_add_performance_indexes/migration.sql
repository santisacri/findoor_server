-- CreateIndex
CREATE INDEX "addresses_city_id_idx" ON "addresses"("city_id");

-- CreateIndex
CREATE INDEX "contact_leads_property_id_idx" ON "contact_leads"("property_id");

-- CreateIndex
CREATE INDEX "favorites_user_id_idx" ON "favorites"("user_id");

-- CreateIndex
CREATE INDEX "properties_is_active_operation_type_property_type_idx" ON "properties"("is_active", "operation_type", "property_type");

-- CreateIndex
CREATE INDEX "properties_owner_id_idx" ON "properties"("owner_id");
