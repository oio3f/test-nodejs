const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://oio3fwk1:edinuktQI4KUW470@firstapi.tcdryfs.mongodb.net/library?retryWrites=true&w=majority"
)
.then(()=> console.log('connect with mongodb'))
.catch(() => {
    console.log(`not connect because`);
})

// edinuktQI4KUW470
