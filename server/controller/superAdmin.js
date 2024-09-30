// Function to check and initialize the super admin if not present
const User = require('../model/user'); // Import the User model
const bcrypt = require('bcryptjs');


const initializeSuperAdmin = async () => {
    try {
      const superAdmin = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL, isSuperAdmin: true });
  
      if (!superAdmin) {
        // const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 12);
        const newSuperAdmin = new User({
          name: 'Super Admin',
          email: process.env.SUPER_ADMIN_EMAIL,
          password:process.env.SUPER_ADMIN_PASSWORD,
          phone:process.env.SUPER_ADMIN_PHONE,
          isAdmin: true,
          isSuperAdmin: true,  // New field to distinguish super admin
          status:"active"
        });
   
        await newSuperAdmin.save();
       
      } else {
        console.log('Super Admin account already exists.');
      }
    } catch (error) {
      console.error('Error initializing Super Admin:', error);
    }
  };

  module.exports=initializeSuperAdmin