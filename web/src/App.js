import React, { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [subscribers, setSubscribers] = useState([]);
  const [oneSubscriber, setOneSubscriber] = useState("");

  const [DeleteItemId, setDeleteItemId] = useState("");
  const [UpdateItemId, setUpdateItemId] = useState("");

  useEffect(() => {

    // Get-all
    fetch('http://localhost:3000/subscribers')
    .then(res => {
      
      // ERR-2, Create the if-else statement to track for the 404 errors, when I add the id for example in the url
      if(res.ok) {
        console.log('SUCCESS')
      } else {
        console.log('NOT SUCCESS')
      }

      return res.json()
    })
    .then(data => {
      setSubscribers(data)
    })
    // ERR-1. Create the line to track for server/browser/fetch errors (404 is not included)
    .catch(error => console.log('ERROR'))

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ get-one~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // // get-one
    // fetch('http://localhost:3000/subscribers/61fef394953350a9c92a1e91')
    // .then(res => {
      
    //   // ERR-2, Create the if-else statement to track for the 404 errors, when I add the id for example in the url
    //   if(res.ok) {
    //     console.log('SUCCESS')
    //   } else {
    //     console.log('NOT SUCCESS')
    //   }

    //   return res.json()
    // })
    // .then(data => {
    //   setOneSubscriber(data)
    // })
    // // ERR-1. Create the line to track for server/browser/fetch errors (404 is not included)
    // .catch(error => console.log('ERROR'))

  }, [])

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ POST ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const postFunction = () => {

    fetch('http://localhost:3000/subscribers', {
      // POST-1, Specify the method in the second arg
      method: 'POST',
      // POST-2, Specify the headers
      headers: {
        'Content-Type': 'application/json'
      },
      // POST-3, Specify the body 
      // POST-4, JSON.stringify the js obj
      body: JSON.stringify({
        name: 'Andrew Petrov',
        subscribedToChannel: "Channel1"
      })

    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log('ERROR'))

  }
  
  
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const deleteFunction = (e) => {
    e.preventDefault();
    console.log(DeleteItemId)
    const id = DeleteItemId

    fetch('http://localhost:3000/subscribers/' + id, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => console.log(data))

  }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PATCH ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const patchFunction = (e) => {
      e.preventDefault();
      console.log(UpdateItemId)
      const id = UpdateItemId
  
      fetch('http://localhost:3000/subscribers/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: '343434',
          subscribedToChannel: "343434"
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
  
    }

// ------------------------------------------------ other -----------------------------------

  const oneSubscriberName = oneSubscriber.name

  return (
    <div className="App">
      <p>Hello world</p>
      <h2>This is the list of the subscribers</h2>

      {subscribers && 
      
        (
            subscribers.map((subscriber) => (
              <div className="subscriber-entry" key={subscriber.id}>
                The name of the subscriber is {subscriber.name}, and they are subscribed to the following channel - {subscriber.subscribedToChannel}.

              </div>
            )) 
        )  

      }

      <h2>And this is the get-one request</h2>

      { oneSubscriberName }
      
      <h2>I am the Post section</h2>
      {/* this is the Post button */}
      <button onClick={() => postFunction()}>Post</button>


      {/* Delete section */}

      <h2>I am the delete section</h2>

      <form onSubmit={deleteFunction}>
        <input
          type="text" 
          required 
          value={DeleteItemId}
          onChange={(e) => setDeleteItemId(e.target.value)}
        />
        <button>Delete</button>
      </form>

      {/* Patch section */}

      <h2>I am the patch section</h2>

      <form onSubmit={patchFunction}>

        <input
            type="text" 
            required 
            value={UpdateItemId}
            onChange={(e) => setUpdateItemId(e.target.value)}
          />

          <button>Patch</button> 

     </form>
    </div>
  );
}

export default App;
