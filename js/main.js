import {store} from "./state";
import {h, render,createContext} from "./preact/preact";
import {useContext, useEffect, useMemo, useState} from "./preact/hooks";
import {useStoreon,StoreContext} from "./preact-storeon";
const {Provider:StoreContextProvider}=StoreContext
window.JSX = h
const filterOptions={
    all: {
        title: "全部",
        filter: ()=>true
    },
    done:{
        title:"已完成",
        filter: function ({done}) {
           return done
        }
    },
    undone:{
        title:"未完成",
        filter: function ({done}) {
            return !done
        }
    }
}
const App = function () {
    const [filter,setFilters]=useState("all")
   const [value,setValue]=useState("")
    const {dispatch}=useStoreon("TodoList")
    const addTodo=()=>{
        dispatch("todo.add",{
            title:value,
            done:false
        })
        setValue("")
    }
    return (

        <div className="main" id="app">
            <div className="container">
                <h1>欢迎使用 Feng 待办事项</h1>
                <div className="input-add">
                    <input type="text" value={value} onChange={(evt)=>{setValue(evt.target.value)}}/>
                    <button onClick={addTodo}><i className="plus"/></button>
                </div>
                <TodoFilters value={filter} onChange={setFilters}/>

                <TodoList filter={filter}/>
                <CloseButton/>
            </div>
        </div>
    )
}
const CloseButton=function () {
    return <button className={"close-button"}>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
    </button>
}
const TodoList = function ({filter}) {

    const {dispatch,TodoList}=useStoreon("TodoList")
    return (
            <div className="todo-list">
                {TodoList.filter(filterOptions[filter].filter).map((value,index) => {
                    return (
                        <TodoItem key={Symbol(value)} value={value} {...value}/>
                    )
                })}
            </div>
    )
}
const TodoItem = function ({title, done,value}) {
    const {dispatch,TodoList}=useStoreon("TodoList")
    const onChange=()=>{
        let index=TodoList.indexOf(value)
        let t=TodoList[index]
        t.done=!t.done
        dispatch("todo.update",TodoList)
    }
    return (<div  className={`todo-item ${done&&"done"}`}>
        <label>
            <input type="checkbox" checked={done} onChange={onChange}/>
            {title}
            <span className="check-button"/>
        </label>
    </div>)
}
const TodoFilters = function ({value,onChange}) {
    return (
        <div className="filters" >
            {
                Object.keys(filterOptions).map((key)=>{
                    const {title}=filterOptions[key]
                    return <div onClick={()=>{onChange(key)}} key={key}  className={`filter ${value===key&&"active"}`}>{title}</div>
                })
            }
        </div>
    )
}

render( <StoreContextProvider value={store}><App/></StoreContextProvider>, document.body)

