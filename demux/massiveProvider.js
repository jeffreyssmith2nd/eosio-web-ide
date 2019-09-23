const massive = require("massive")

const dbConfig = {
	host: '127.0.0.1',
	port: 5432,
	database: 'postgres',
	user:'gitpod',
    schema: 'talk'
}

class MassiveProvider {
    static async getMassive() {
        if (!MassiveProvider.massiveInstance) {
            console.log('Instantiating massive connection...')
            MassiveProvider.massiveInstance = await massive(dbConfig)
            console.log('Instantiated massive connection.')
        }
        return MassiveProvider.massiveInstance
    }

    static massiveInstance;// = ""
}

module.exports = MassiveProvider