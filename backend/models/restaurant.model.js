// const mongoose = require('mongoose');

// const restaurantSchema = new mongoose.Schema(
//     {
//         name: String,
//         address: String,
//         image: String,
//         openTime: String,
//         closeTime: String,
//         description: String
//     },
//     {
//         timestamps: true
//     }
// );

// const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'restaurants');

// module.exports = Restaurant;


const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  image: String,
  openTime: String,
  closeTime: String,
  description: String,
  tableTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TableType' }],
  timeSlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot' }]
}, {
  timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema, 'restaurants');
module.exports = Restaurant;
