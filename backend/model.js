const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const CategorySchema = Schema({
  name: String,
  weight: Number,
  format: String
})
const Category = model('Category', CategorySchema);

const GradeSchema = Schema({
  "category": String,
  "name": String,
  "percent_grade": Number,
  "points": Number,
  "max_points": Number,
  "weight": Number,
  "extra-credit": Boolean
})
const Grade = model('Grade', GradeSchema);

const ClassSchema = Schema({
  name: { type : String , unique : true, required : true, dropDups: true },
  professor: String,
  creator: String,
  rubric: [CategorySchema],
  grades: [GradeSchema]
})
const Class = model('Class', ClassSchema);



module.exports = {Category, Grade, Class}
