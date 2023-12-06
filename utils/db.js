import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
	this.connected = false;
	const url = `mongodb://${process.env.DB_HOST || 'localhost'}:` + `${process.env.DB_PORT || 27017}`;

	const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
	this.client = new MongoClient(url, {
	    useUnifiedTopology: true
	});

	this.client.connect((err, client) => {
	    if (err) console.log('Error just occured');
	    this.connected = true;
	    this.database = client.db(DB_DATABASE);
	});
    }

    isAlive() {
	return this.connected;
    }

  async nbUsers() {
    return this.database.collection('users').countDocuments();
  }

  async nbFiles() {
      return this.database.collection('files').countDocuments();
  }
}
const dbClient = new DBClient();
export default dbClient;
