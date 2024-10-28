import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiEditLine, RiDeleteBin6Line, RiShareForward2Fill, RiEyeLine, RiFileCopyLine, RiCalendar2Line } from "react-icons/ri";
import { deleteTodoFile } from "../feature/counter/todoSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AllTodos = () => {
  const alltodos = useSelector((state) => state.todo.todos);
  
  const [searchTerms, setSearchTerms] = useState("");

  const dispatch = useDispatch();

  const filteredData = alltodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerms.toLowerCase())
  );

  function handleDelete(todoID){
    dispatch(deleteTodoFile(todoID));
  }

  const handleShare = async (todoID) => {
    const baseURL = "https://todos.com/files/"
    const link = `${baseURL}/${todoID}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this card!',
          text: 'I wanted to share this card with you.',
          url: link,
        });
        console.log('Share successful');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback if the Web Share API is not supported
      console.log('Web Share API not supported, copying link to clipboard as fallback.');
      navigator.clipboard.writeText(link)
        .then(() => {
          alert('Link copied to clipboard! Share it wherever you want.');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }

  }

  return (
    <>
      <div className="inpt w-[65%] mx-auto mt-4 flex flex-row gap-3 text-white">
        <input
          type="text"
          className="w-[75%] px-4 py-2 rounded-full bg-zinc-900 outline-none text-white border-2 border-black"
          placeholder="Search here"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
        <button
          className="border-2 border-black bg-blue-500 w-[24%] rounded-full items-center"
        >
          Search
        </button>
      </div>

      <div className="notesbody w-[65%] mx-auto mt-3 border-2">
        <div className="head w-full border-b-2 h-16 text-2xl text-white font-bold flex justify-center items-center">
            <p>All Notes</p>
        </div>
      <div className="cards w-full h-[65vh] flex flex-col text-white items-center gap-3 px-2 py-2 overflow-y-auto">
        {
            filteredData.length > 0 &&
            filteredData.map(
                (data, index) => {
                    return(
                        <div key={index} className="card w-full h-[9rem] flex justify-between flex-row border-2 rounded-lg px-3 py-4">
                            <div className="cardleft w-[57%] text-white px-2 flex flex-col items-start justify-between overflow-hidden">
                                <p className="datatitle text-4xl capitalize font-semibold">{data.title}</p>
                                <p className="datacontent text-slate-400 mt-2 text-sm w-full h-full">{data.content}</p>
                            </div>

                            <div className="cardright w-[41%] text-white px-2 flex flex-col items-end overflow-hidden">
                              <div className="buttons flex flex-row gap-3">
                                <Link 
                                to={`/?todoID=${data?._id}`}
                                className="btn border bg-zinc-950 px-1 py-2 rounded-sm text-2xl font-semibold hover:text-blue-500 hover:border-blue-500">
                                  <RiEditLine />
                                </Link>

                                <button
                                onClick={(e) => handleDelete(data?._id)}
                                className="btn border bg-zinc-950 px-1 py-2 rounded-sm text-2xl font-semibold hover:text-red-500 hover:border-red-500">
                                  <RiDeleteBin6Line />
                                </button>

                                <button 
                                onClick={() => handleShare(data?._id)}
                                className="btn border bg-zinc-950 px-1 py-2 rounded-sm text-2xl font-semibold hover:text-yellow-400 hover:border-yellow-400">
                                  <RiShareForward2Fill />
                                </button>

                                  <Link
                                  className="btn border bg-zinc-950 px-1 py-2 rounded-sm text-2xl font-semibold hover:text-blue-300 hover:border-blue-300"
                                  to={`/files/${data?._id}`}
                                  >
                                   <RiEyeLine />
                                  </Link>

                                <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(data?.content);
                                  toast.success("Coppied to clipboard");
                                }}
                                className="btn border bg-zinc-950 px-1 py-2 rounded-sm text-2xl font-semibold hover:text-green-500 hover:border-green-500">
                                  <RiFileCopyLine />
                                </button>


                              </div>
                              <div className="date mt-2 flex flex-row items-center justify-center gap-2">
                                <div className="claender pt-1 text-2xl">
                                <RiCalendar2Line />
                                </div>
                                {data.createdAt}
                              </div>
                            </div>
                        </div>
                    )
                }
            )
        }
      </div>
      </div>

    </>
  );
};

export default AllTodos;
