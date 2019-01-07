**emfactor-client-core**

Responsible for managing all client-side persistent data and handling actions. 


**Store**

Use store to access state. Import from `/store`and call `store.subscribe(fn)` to subscribe 
and `store.unsubscribe(fn)` to unsubscribe. `fn` will be passed the new state.

**Actions**

Call these to trigger actions. Check `/actions/index` for a master list of actions. You can import three ways

Individual action
`import { login } from 'emfactor-client-core/actions'`  
Grouped actions  
`import * as actions from 'emfactor-client-core/actions'`  
`import { actions } from 'emfactor-client-core'`  



