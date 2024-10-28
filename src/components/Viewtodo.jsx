import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RiFileCopyLine } from "react-icons/ri";
import toast from "react-hot-toast";

const Viewtodo = () => {
  const { id } = useParams();
  const allTodos = useSelector((state) => state.todo.todos);

  const todo = allTodos.filter((det) => det._id === id)[0];

  return (
    <>
      <div className="viewnote w-[65%] mx-auto mt-4 flex flex-row gap-3 text-white">
        <input
          type="text"
          className=" w-[75%] mx-auto px-4 py-2 rounded-full bg-zinc-900 outline-none text-white border-2 border-black"
          placeholder="Enter title here"
          value={todo.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="content w-[65%] mx-auto mt-2 text-white">
        <div className="w-full bg-zinc-800 flex items-center justify-between px-3 rounded-t-2xl">
          <p className="px-1 text-yellow-400 font-bold">Your note</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(todo.content);
              toast.success("Coppied to clipboard");
            }}
            className="btn px-1 py-2 rounded-sm text-xl font-semibold hover:text-green-500"
          >
            <RiFileCopyLine />
          </button>
        </div>
        <textarea
          className="contarea w-full rounded-b-3xl px-4 py-5 bg-zinc-950 border-2 border-black outline-none"
          value={todo.content}
          disabled
          placeholder="Enter content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={16}
        />
      </div>
    </>
  );
};

export default Viewtodo;
