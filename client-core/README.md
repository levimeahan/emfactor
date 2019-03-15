# emfactor-client-core

Responsible for managing all client-side persistent data, handling actions, and
reusable logic for processing/filtering data sent to the display layer (see Selectors). 

## Exports
Check `index.ts` for exports this core makes available. As a general rule of thumb, 
try to import from the main package itself, not subdirectories. Most of the main concepts
listed below have are exported through `index.ts`.

## Store

Use store to access global state. Call `store.subscribe(fn)` to subscribe to changes
and `store.unsubscribe(fn)` to unsubscribe. `fn` will be passed the new state whenever
it changes.

As a general rule of thumb - The store contains any type of state that needs to be sent 
to/from the server, or values directly related to those. Everything else is most likely 
better served by living in the components/hooks themselves.

## Actions

Call these to handle all necessary actions. Check `/actions` folder for all actions. Do
NOT dispatch store yourself.

NOTE: As server is not yet implemented, for testing purposes all actions currently either 
call a function from `mockServerActions` or dispatch the state change directly without
running it through the API. 

## Selectors

Call these and pass current state to get a slice returned. Also used for abstracting logic.
These will have "answers to questions" such as "is the user logged in" = 
`userLoggedIn(state)` as well as processed/filtered data such as `currentScheduleWeek(state)`.
Generally any logic that requires analysis of state to determine a value that is not 
environment-dependent should be placed in these selectors to be re-used between platforms.

**TODO: Memoization**

## Entity Concepts

See [Type Declarations](./src/types/index.d.ts) for what properties each entity has.

**Shift**  
Template of a shift (start/end times, what role required, etc). Also called base shift,
original shift, etc.Days have multiple shifts

**Scheduled Shift**  
A finalized shift. It stores an independent copy of the shift data so that
changing shift templates for future weeks does not affect currently scheduled weeks and
so that one-off changes for a specific day/week can be made without changing
all weeks.

**Schedule Week (Draft)**  
`draft=true`  
Draft weeks represent schedules that are in-progress and should not be displayed to 
employees, only managers. Their shift info is based on the base template data, with the
only info from scheduled shifts used being the id of employees assigned to each shift.

**Schedule Week (Finalized)**  
`draft=false`  
Finalized weeks represent final schedules that are displayed to employees. Their shift 
info is based on the final scheduled shift data, and once finalized the schedule will
NOT update when changes to base shift data are made. They can be reverted to a draft
if desired, at which point their finalized data will be largely overridden and they 
will work as described in the draft section above.


