const massive = require("massive")

const handlerVersions = [{
  versionName: 'v1',
  updaters: [{
    actionType: 'talk::post',
    apply: (state, payload, blockInfo, context) => {
        console.log(payload)
        // See https://massivejs.org/docs/connecting for info on massive configuration
        const dbConfig = {
            host: '127.0.0.1',
            port: 5432,
            database: 'postgres',
            user:'gitpod',
            schema: 'talk'
        }

        massive(dbConfig).then((db) => {
            console.log(db)
            db.talk.post.insert({
                id: payload.data.id,
                reply_to: payload.data.reply_to,
                user_name: payload.data.user,
                content: payload.data.content
            })
        })

    }
  }],
  effects: [{
    actionType: 'talk::post',
    run: (payload, blockInfo, context) => { console.log(blockInfo) }
  }],
}]

module.exports = handlerVersions