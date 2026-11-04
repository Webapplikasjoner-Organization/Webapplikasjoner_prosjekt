// Relations v2, som er måten Drizzle v1 gjør det på.
//
// Alle relasjoner defineres i ETT kall, ikke per tabell med `relations()` slik
// det var i 0.x. `fields`/`references` heter nå `from`/`to`.
//
// Det er dette objektet som gjør at
// `db.query.tasks.findFirst({ with: { user: true } })` virker. Det sendes til
// `drizzle(..., { relations })` i ./index.ts.
import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    usergames: r.many.usergames({ from: r.users.id, to: r.usergames.id }),
  },
  usergames: {
    user: r.one.users({
      from: r.usergames.userid,
      to: r.users.id,
      optional: false,
    }),
  },
}));

export type Relations = typeof relations;
