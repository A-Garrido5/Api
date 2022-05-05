const mongoose = require('mongoose');

//(async () => {

  const db =  mongoose.connect('mongodb://mongo/mydatabase', {
    useNewUrlParser : true,
    useUnifiedTopology : true
  })
      .then(db => {
        console.log('Db is connected to ', db.connection.host);
        
        db.connection.dropDatabase();


      })
      .catch(err => console.error(err))

      
  //await MyModel.create({ name: 'Val' }, { name: 'Varun' });
  module.exports = db;


