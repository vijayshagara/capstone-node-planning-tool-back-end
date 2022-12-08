const mongo = require("../connect");
//const { ObjectId } = require("mongodb");

module.exports.getEmployee = async (req, res, next) => {
  try {
    const getResponse = await mongo.selectedDB
      .collection("capEmployee")
      .find()
      .toArray();
    res.send(getResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.createEmployee = async (req, res, next) => {
  try {
    //console.log(req.body);
    const insertedResponse = await mongo.selectedDB
      .collection("capEmployee")
      .insertOne(req.body);
    res.send(insertedResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.updateEmployee = async (req, res, next) => {
  try {
    const paramsId = req.params.id;

    const updatedResponse = await mongo.selectedDB
      .collection("capEmployee")
      .findOneAndUpdate(
        { id: paramsId },
        { $set: { ...req.body.empolyee } },
        { returnDocument: "after" }
      );
    res.send(updatedResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.deleteEmployee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedData = await mongo.selectedDB
      .collection("capEmployee")
      .remove({ id: id });
    res.send(deletedData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
