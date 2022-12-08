const mongo = require("../connect");
const { ObjectId } = require("mongodb");

module.exports.getProjects = async (req, res, next) => {
  try {
    const getResponse = await mongo.selectedDB
      .collection("capProject")
      .find()
      .toArray();
    res.send(getResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.getProjectById = async (req, res, next) => {
  const id = req.params.id
  try {
    const getResponseById = await mongo.selectedDB
      .collection("capProject")
      .find({_id:ObjectId(id)})
      .toArray();
    res.send(getResponseById);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.createProjects = async (req, res, next) => {
  try {
    //console.log(req.body);
    const insertedResponse = await mongo.selectedDB
      .collection("capProject")
      .insertOne(req.body);
    res.send(insertedResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.updateProjects = async (req, res, next) => {
  try {
    const id = req.params.id;

    const updatedResponse = await mongo.selectedDB
      .collection("capProject")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { ...req.body} },
        { returnDocument: "after" }
      );
    res.send(updatedResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports.deleteProjects = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedData = await mongo.selectedDB
      .collection("capProject")
      .remove({ _id:ObjectId(id) });
    res.send(deletedData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
