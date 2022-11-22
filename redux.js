import  {combineReducers,createStore} from "redux"

// aCTIONS
const createPolicy=(name,amount)=>{
    return{
        type:'CREATE_POLICY',
        payload:{
            name,amount
        }
    }
}

const createClaim=(name,amount)=>{
    return{
        type:'CREATE_CLAIM',
        payload:{
            name,amount
        }
    }
}

const deletePolicy=(name)=>{
    return{
        type:'DELETE_POLICY',
        payload:{
            name
        }
    }
}

// DEPARTMENTS

const claims=(listofclaims=[], action)=>{
    if(action.type==='CREATE_CLAIM'){
        return [...listofclaims, action.payload.name]
    }
    return listofclaims
}


const policies=(listofPolicies=[], action)=>{
    if(action.type==='CREATE_POLICY'){
        return [...listofPolicies, action.payload.name]
    }if(action.type==='DELETE_POLICY'){
        return listofPolicies.filter(name => name!==action.payload.name)
    }
    return listofPolicies
}


const accounting= (money=0, action)=>{
     if(action.type==='CREATE_POLICY'){
        return money+ action.payload.amount
    }if(action.type==='CREATE_CLAIM'){
        return money - action.payload.amount
    }
    return money
}


const ourdepartments=combineReducers({
    policies,
    accounting,
    claims
})


const store = createStore(ourdepartments)

store.dispatch(createPolicy('Jonathan', 400))
store.dispatch(createPolicy('Christine', 600))
store.dispatch(createPolicy('Stacy', 500))
store.dispatch(deletePolicy('Jonathan'))
store.dispatch(createClaim('Christine',700))


console.log(store.getState());