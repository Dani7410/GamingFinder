const router = require("express").Router();
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config()
	
            /*
            const uri = "mongodb+srv://"+process.env.USER+":<"+process.env.PASS+">@cluster0.ktewt.mongodb.net/Cluster0?retryWrites=true&w=majority";

                                                                        // der kan være nogle complicationer med unifiedTopology evt false. svært check at finde nævnte han.
			const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		

			client.connect(err => {

			const collection = client.db("test").collection("games");
		
            router.get("/games/add" , (req, res) =>{
                collection.createIndexes(
                    [
                        {
                            "a":1
                        },
                        {
                            "b":1
                        }
                    ]
                )
            })
            */
			


		// perform actions on the collection object
            router.get("/games", (req, res) =>{
                
                console.log('Connected successfully to server');

                collection.find(contacts.game<0).toArray((error, data) => {
                //console.log(data);
    
                // for each loop på data array " så med data.name console log"
                data.forEach(element => console.log(element.name , element.emne, element.text));
    
                })
            })

        // dette get kalder dataOpretMongo routeren
       
		
			client.close();


            // denne outcomment høre til ovenstående "linje 7" !
			//});

        

            module.exports = router;

            