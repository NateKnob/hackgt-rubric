const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
const passportLocalMongoose = require('passport-local-mongoose');

const CategorySchema = Schema({
  name: String,
  weight: Number,
  formula: String
})
const Category = model('Category', CategorySchema);


const CourseSchema = Schema({
  name: String,
  professor: String,

  owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})
const Course = model('Course', CourseSchema);


const GradeSchema = Schema({
  name: String,
  category: String,
  // percent_grade: Number,
  points: Number,
  max_points: Number,
  weight: Number,
  extra_credit: Boolean
})
const Grade = model('Grade', GradeSchema);


const CourseMemorySchema = Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  grades: [GradeSchema]
})
const CourseMemory = model('CourseMemory', CourseSchema);


const UserSchema = new Schema({
  course_ownership: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  course_memories: [CourseMemorySchema],
  username: String,
  password: String
});
UserSchema.plugin(passportLocalMongoose);
User = mongoose.model('User', UserSchema);

module.exports = {Category, Course, Grade, CourseMemory, User}
