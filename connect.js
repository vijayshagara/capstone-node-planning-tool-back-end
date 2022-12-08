const { MongoClient } = require("mongodb");

module.exports = {
  selectedDB: {},
  async connect() {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URL);
      this.selectedDB = client.db("capstone");
      console.log("DB started Successfully");
    } catch (error) {
      console.log(error);
    }
  },
};
