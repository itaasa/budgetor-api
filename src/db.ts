import { MongoClient } from 'mongodb';
import config from 'config';

const mongoUrl = `mongodb+srv://${config.get('mongoUsername')}:${config.get('mongoPassword')}@${config.get('mongoClusterUrl')}.rcdal.mongodb.net/budgetor?retryWrites=true&w=majority`;

export class DbConnection {
    collection: any;
    instance = 0;

    async dbConnect(){
        try {
            let _db = await MongoClient.connect(mongoUrl);
            this.collection = _db.db('budgetor');
        } catch(e) {
            console.log(e);
            console.log('error connecting to db');
        }
    }

    async get() {
        try{
            this.instance++;
            
            if (this.collection != null){
                return this.collection;
            } else {
                await this.dbConnect();
                return this.collection;
            }
        } catch(e){
            console.log(e);
            return e;
        }
    }
}    
