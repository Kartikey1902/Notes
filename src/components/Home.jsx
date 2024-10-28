import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addTodoFile, updateTodoFile } from "../feature/counter/todoSlice";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const allTodosFile = useSelector((state) => state.todo.todos);

  const [searchParam, setSearchParam] = useSearchParams();
  const todoID = searchParam.get("todoID");
  
      useEffect(() => {
      if(todoID){
        console.log("insde use effect");
        
        const todo = allTodosFile.find((t) => t._id === todoID);
        console.log("page found");
        
          setTitle(todo.title);
          setValue(todo.content);
      }
  }, [todoID]);

  function handleCreateTODO(){

    if (!title.trim() || !value.trim()) {
      toast.error("Title and content are required");
      return;
    }

    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const todo = {
      title: title,
      content: value,
      _id: todoID || Date.now().toString(30),
      createdAt: formattedDate, 
    }

    if(todoID){
      //update
      dispatch(updateTodoFile(todo));
    }
    else{
      //create
      dispatch(addTodoFile(todo));
    }

    // after creation and updation
    setTitle("");
    setValue("");
    setSearchParam({});
  }

  return (
    <>
      <div className="inpt w-[65%] mx-auto mt-4 flex flex-row gap-3 text-white">
        <input
          type="text"
          className="w-[75%] px-4 py-2 rounded-full bg-zinc-900 outline-none text-white border-2 border-black"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
        onClick={handleCreateTODO}
        className="border-2 border-black bg-blue-500 w-[24%] rounded-full items-center font-semibold">
          {todoID ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="content w-[65%] mx-auto mt-4 text-white">
        <textarea 
        className="w-full rounded-3xl px-4 py-4 bg-zinc-950 border-2 border-black outline-none"
        value={value}
        placeholder="Enter content here..."
        onChange={(e) => setValue(e.target.value)}
        rows={18}
        />
      </div>
    </>
  );
};

export default Home;
