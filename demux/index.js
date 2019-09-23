const { BaseActionWatcher } = require("demux")
const { MassiveActionHandler } = require("demux-postgres")
const { NodeosActionReader } = require("demux-eos") // Or any other compatible Action Reader

const massive = require("massive")
// See https://eosio.github.io/demux-js/ for info on Handler Versions, Updaters, and Effects
// const handlerVersions = require("./handlerVersions") // Import your handler versions

// See "Migrations" section above
const migrationSequences = require("./migrationSequences")

// See https://massivejs.org/docs/connecting for info on massive configuration
const dbConfig = {
	host: '127.0.0.1',
	port: 5432,
	database: 'postgres',
	user:'gitpod',
    schema: 'talk'
}

const handlerVersions = [{
  versionName: 'v1',
  updaters: [{
    actionType: 'eosio.token::transfer',
    apply: (state, payload, blockInfo, context) => { console.log(blockInfo) }
  }],
  effects: [],
}]

massive(dbConfig).then((db) => {
  const actionReader = new NodeosActionReader({
      startAtBlock: 0,
      onlyIrreversible: false,
      nodeosEndpoint: 'http://127.0.0.1:8888'
  })
  const actionHandler = new MassiveActionHandler(
    handlerVersions,
    db,
    migrationSequences,
    {
        dbSchema: dbConfig.schema
    }
  )
  const actionWatcher = new BaseActionWatcher(actionReader, actionHandler, 500)
  actionWatcher.watch()
})