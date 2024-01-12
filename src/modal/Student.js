import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
      },
      course:{
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      image :{
        type: String,
      },
      phone:{
      type:Number,
      },
      isAdmin: {
        default: false,
        type: Boolean,
      },
      timestamp: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
