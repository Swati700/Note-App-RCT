import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setdetails] = useState("");
  const [tasks, setTasks] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    const copyTask = [...tasks];
    copyTask.push({ title, details });
    setTasks(copyTask);

    setTitle("");
    setdetails("");
  };

  const deleteNote = (idx) => {
    const copyTask = [...tasks];
    copyTask.splice(idx, 1);
    setTasks(copyTask)
  };

  return (
    <div className="h-screen lg:flex bg-black text-white">
      <form
        onSubmit={submitHandler}
        className="flex gap-4 lg:w-1/2 flex-col items-start p-10"
      >
        <h1 className="text-4xl font-bold">Add Notes</h1>

        {/* first input for heading */}
        <input
          type="text"
          value={title}
          placeholder="Enter Notes Heading"
          className="px-5 w-full font-medium py-2 border-2 outline-none rounded"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* first input for details */}
        <textarea
          type="text"
          value={details}
          placeholder="Write Details"
          className="px-5 w-full font-medium h-32 py-2 border-2 outline-none rounded"
          onChange={(e) => {
            setdetails(e.target.value);
          }}
        />

        <button className="px-5 active:scale-95 w-full font-medium py-2 rounded outline-none bg-white text-black">
          Add Note
        </button>
      </form>
      <div className="lg:w-1/2 lg:border-l-2 p-10">
        <h1 className="text-4xl font-bold">Recent Notes</h1>
        <div className="flex gap-5 flex-wrap items-start justify-start mt-5 h-[90%] overflow-auto">
          {tasks.map(function (elem, idx) {
            return (
              <div
                key={idx}
                className=" flex justify-between flex-col items-start relative h-52 w-40 bg-cover rounded-xl text-black pt-9 pb-4 px-4 bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')]"
              >
                <div>
                  <h3 className="leading-tight text-lg font-bold">
                    {elem.title}
                  </h3>
                  <p className="mt-4 leading-tight text-xs font-semibold text-gray-600">
                    {elem.details}
                  </p>
                </div>
                <button
                  onClick={() => {
                    deleteNote(idx);
                  }}
                  className="w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
