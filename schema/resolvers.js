
const {ColumnList} = require('./Fakedata')
const {TaskList}=require('./TaskData')
const _=require("lodash")
const resolvers ={
    Query:{
        columns:async()=>{
 return  ColumnList
        },
        task:()=>{
            return TaskList
        }
    },
    Mutation:{
       
            createColumn:(parent, args)=>{
                const Column =args.input
                let lastId=10;
                if(ColumnList.length>0 ){
                    lastId = ColumnList[ColumnList.length-1].id
                    }
                Column.id=lastId+1;
                ColumnList.push(Column);
                return Column;
                },
        
updateColumn: async (parent, args) => {
    const { name } = args.input;
    const { id } = args;
     
    // Find the index of the column with the matching id
    const updatedColumnIndex = ColumnList.findIndex((col) => (col.id) === Number(id));
  
        // Update the name of the matching column
    if (updatedColumnIndex !== -1) {
        ColumnList[updatedColumnIndex].name = name;
  
      // Return the updated column
      return ColumnList[updatedColumnIndex];
    } else {
      // Handle the case when no matching column is found
      console.log(`Column with id ${id} not found in ColumnList.`);
    }
  
    return null;
  },
  
updateTask:async(parent,args)=>{
    
const{columnId,taskName}=args.input;

const {id}=args;
let updatedTaskIndex = TaskList.findIndex((task) => (task.id) === Number(id));

// Update the name and column of the matching Task
if(updatedTaskIndex!==-1){
    TaskList[updatedTaskIndex].columnId=columnId;
    TaskList[updatedTaskIndex].taskName=taskName
    return TaskList[updatedTaskIndex]
}
// Handle the case when no matching task is found
return null;
},

deleteColumn:(parent,args)=>{
    const id= args.id;
    _.remove(ColumnList,(column)=>column.id===Number(id));
    return null;
},

createTask:(parent, args)=>{
    const Task =args.input
    let lastTaskId=0;
    if(TaskList.length>0){
        lastTaskId = TaskList[TaskList.length-1].id
        }
        Task.id=lastTaskId+1;
    TaskList.push(Task);
    return Task;
    },
    deleteTask:(parent,args)=>{
        const id= args.id;
        _.remove(TaskList,(task)=>task.id===Number(id));
        return null;
    },
    }
}

module.exports={resolvers}