const MongoClient = require('mongodb').MongoClient;
		
		
			const uri = "mongodb+srv://"+process.env.USER+":<"+process.env.PASS+">@cluster0.ktewt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
		
                                                                        // der kan være nogle complicationer med unifiedTopology evt false. svært check at finde nævnte han.
			const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		
		
			client.connect(err => {
		
		
			const collection = client.db("test").collection("devices");
		
		
			// perform actions on the collection object
		
		
			client.close();
		
		
			});