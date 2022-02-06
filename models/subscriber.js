// D3. init mongoose
const mongoose = require('mongoose')

// D4. Create the Schema

const subscriberSchema = mongoose.Schema({
    // D5. Create the shells for the key-value pairs for elements within the Schema - ps - https://i.imgur.com/aKXz843.png
    name: {
        // D6. Create the data for the pair - ps - https://i.imgur.com/JGcqj2R.png
        type: String,
        required: true
    }, 
    subscribedToChannel: {
        type: String,
        required: true

    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now

    }
})

// D7. Export the model (D8 is in subscribers.js)
module.exports = mongoose.model('Subscriber', subscriberSchema);

