var client = require('../../connection/elk');

client.indices.delete({index: 'gov'},function(err,resp,status) {  
  console.log("delete",resp);
});