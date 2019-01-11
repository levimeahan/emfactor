**emfactor-client-core**

Responsible for managing all client-side persistent data and handling actions. 


**Store**

Use store to access global state. Import from `/store`and call `store.subscribe(fn)` to subscribe 
and `store.unsubscribe(fn)` to unsubscribe. `fn` will be passed the new state.

As a general rule of thumb - The store contains any type of state that needs to be sent 
to/from the server, or values directly related to those. Everything else is most likely better
served by living in the components/hooks themselves.

**Actions**

Call these to trigger actions. Check `/actions/index` for a master list of actions.


**Selectors**

Call these and pass current state to get a slice returned. Also used for abstracting logic.
These will have "answers to questions" such as "is the user logged in" = `userLoggedIn(state)`.
Generally any logic that requires analysis of state to determine a value that is not 
environment-dependent should be placed in these selectors to be re-used between platforms.



