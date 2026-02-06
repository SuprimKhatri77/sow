import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  text,
  numeric,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productUnitEnum = pgEnum("unit", [
  "piece",
  "set",
  "kilogram",
  "meter",
  "liter",
]);
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  inPrice: numeric("in_price").notNull(),
  price: numeric("price").notNull(),
  inStock: integer("in_stock").notNull(),
  unit: productUnitEnum("unit").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
