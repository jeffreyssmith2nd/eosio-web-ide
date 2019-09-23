const { Migration } = require("demux-postgres")

const createTalkTable = new Migration(
  "createTalkTable", // name
  "talk", // schema
  "talk.sql", // SQL file
)

// MigrationSequence[]
// See: https://github.com/EOSIO/demux-js-postgres/blob/develop/src/interfaces.ts
module.exports = [{
  migrations: [createTalkTable],
  sequenceName: "init"
}]