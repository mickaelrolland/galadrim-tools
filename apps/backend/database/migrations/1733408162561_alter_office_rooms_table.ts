import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
    protected tableName = "office_rooms";

    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.boolean("is_phonebox").defaultTo(false);
        });
    }

    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn("is_phonebox");
        });
    }
}
