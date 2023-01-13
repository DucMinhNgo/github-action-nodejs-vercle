var client = require('../../connection/elk');

client.delete({  
  index: 'gov',
  id: '1',
  type: 'constituencies'
},function(err,resp,status) {
    console.log(resp);
});
