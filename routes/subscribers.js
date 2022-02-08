
// C	Create the router shell

// C1. Init express
const express = require('express');

// C2. Init router
const router = express.Router();

// E1. Init the model
const Subscriber = require('../models/subscriber')


// C4. Create the routes shell - see the ps - https://i.imgur.com/xJJ99rp.png

// C4.1 getting all

router.get('/', async (req, res) => {
    // E2. speify the funct as async
    // E3. Find and return all the subscribers - in try
    try { 
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    // E4. Return the 500 error (server problem) - in catch
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
    // E5. Do the route.rest check - the empty array should be returned
})

// C4.2. Getting one 

// H1. specify the middleware before the function
router.get('/:id', getSubscriber, (req, res) => {
    // C5.5 Create a test in get-onr (C5.6 is in router.rest)
    // H2. return the item obj in json - res.json(res.subscriber)
    // H3. test in route.rest + make a mistake to check the res
    // H4. Apply middleware to the rest of the routes
    res.json(res.subscriber)
})

// C4.3 Creating one
router.post('/', async (req, res) => {
    // F1. Specify async for function
    // F2. Create the subscriber obj by getting the data from req
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    // F3. Create the catch to get the data
    try {
        // F4. Save the subcriber obj
        const newSubscriber = await subscriber.save()
        // F5. return the json data + status 201 for the successful obj creation
        res.status(201).json(newSubscriber)
    } catch(err) {
        // F6. Create the catch for the error with the 400 status for the mistake by the user (F7 is in route.rest)
        res.status(400).json({ message: err.message })
    }
})

// C4.4. Updating one

// J1. async
router.patch('/:id', getSubscriber,  async (req, res) => {
    // J2. Check for the existence of the updated data via the if checks
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }

    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try {
        // J3. Create the updatedSubscriber to see access the new data
        const updatedSubscriber = await res.subscriber.save()

        // J4. res.json the updatedSubscriber
        res.json(updatedSubscriber)

    } catch (err) {

        // J5. catch the 400 error (J6 is in route.rest)
        res.status(400).json({ message: err.message })

    }



})

// C4.5. Deleting one
// I1. async
router.delete('/:id', getSubscriber, async (req, res) => {
    
    try {
        // I2. remove the item
        await res.subscriber.remove()

        // I3. Notify the user that the item was deleted
        res.json({ message: 'Subscriber has been deleted' })

    } catch (err) {
        // I4. Catch the error + 500 for server-side problem (I5 is in route.rest)
        res.status(500).json({ message: err.message })
    }
})

// G1. Create the middleware shell
// G2. specify the req, req, next as params
async function getSubscriber(req, res, next) {
    // G3. create the let without assigning it for "receivedSubscriber"
    let receivedSubscriber

    try {
        // G4. In try, find the subscriber by id
        receivedSubscriber = await Subscriber.findById(req.params.id)
        // G5. Create the null finder
        if (receivedSubscriber == null ) {
            // G6. json res with the 404 status, i.e. showing that we couldn't find the item based on the user's inputs
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }

    } catch (err) {
        // G7. Catch the error + status 500, i.e. the server-side problem
        res.status(500).json({ message: err.message })
    }

    // G8. Assign the data to res.subscriber in order to be able to access "subscriber" in the routes
    res.subscriber = receivedSubscriber;

    // G9. next()
    next()
}


// C3. Export
module.exports = router