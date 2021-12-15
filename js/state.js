import {createStoreon} from "./storeon";
function TodoList(store) {

    store.on('@init', () => ({TodoList: [
            {
                title:"测试",
                done:false
            },
            {
                title:"测试1",
                done:true
            },
            {
                title:"测试2",
                done:true
            },
            {
                title:"测试3",
                done:false
            },
            {
                title:"测试3",
                done:false
            },
            {
                title:"测试3",
                done:false
            },

        ]}))

    store.on('todo.update', (_, TodoList) => {
        return {TodoList}
    });
    store.on("todo.add",({TodoList},todo)=>{
        TodoList.unshift(todo)
        return {TodoList}
    })
    store.on('todos.delete', (state, index) => {

        const {todos} = state;

        todos.splice(index, 1);

        return {

            todos,

        };

    });
    store.on("@dispatch",(data)=>{
        console.log("dispatch",data)
    })
}
export const store = createStoreon([TodoList])