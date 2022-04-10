require("dotenv").config()
const logger = (arg) => {
    if(process.env.NODE_ENV === "development"){
        console.log(arg)
    }
    // setup production log here
}

module.exports = logger;