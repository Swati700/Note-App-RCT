import { useState } from "react";
import { Edit2, Trash2, X, Check, Search } from "lucide-react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setdetails] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !details.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const copyTask = [...tasks];
    copyTask.push({ 
      id: Date.now(), 
      title, 
      details,
      createdAt: new Date().toLocaleDateString()
    });
    setTasks(copyTask);

    setTitle("");
    setdetails("");
  };

  const deleteNote = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDetails(task.details);
  };

  const saveEdit = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, title: editTitle, details: editDetails }
        : task
    );
    setTasks(updatedTasks);
    setEditingId(null);
    setEditTitle("");
    setEditDetails("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDetails("");
  };

  // Filter notes based on search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen lg:flex bg-gradient-to-br from-slate-900 to-black text-white">
      {/* Left Side - Add Notes Form */}
      <form
        onSubmit={submitHandler}
        className="flex gap-4 lg:w-1/2 flex-col items-start p-10 overflow-y-auto"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Add Notes
        </h1>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          placeholder="Enter Notes Heading"
          className="px-5 w-full font-medium py-3 border-2 border-slate-600 outline-none rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:border-blue-500 transition"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* Details Textarea */}
        <textarea
          value={details}
          placeholder="Write Details"
          className="px-5 w-full font-medium h-32 py-3 border-2 border-slate-600 outline-none rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:border-blue-500 transition resize-none"
          onChange={(e) => {
            setdetails(e.target.value);
          }}
        />

        <button className="px-6 active:scale-95 w-full font-bold py-3 rounded-lg outline-none bg-gradient-to-r from-blue-500 to-cyan-500 text-black hover:shadow-lg hover:shadow-blue-500/50 transition">
          Add Note
        </button>

        <p className="text-sm text-slate-400 mt-2">
          Total Notes: <span className="font-bold text-cyan-400">{tasks.length}</span>
        </p>
      </form>

      {/* Right Side - Display Notes */}
      <div className="lg:w-1/2 lg:border-l-2 border-slate-700 p-10 flex flex-col overflow-hidden">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Recent Notes
        </h1>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-slate-600 outline-none rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:border-blue-500 transition"
          />
        </div>

        {/* Notes Display */}
        <div className="flex gap-5 flex-wrap items-start justify-start overflow-y-auto flex-1 pb-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((elem) => (
              <div
                key={elem.id}
                className="flex justify-between flex-col items-start h-64 w-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border-2 border-slate-700 hover:border-blue-500 p-4 transition shadow-lg hover:shadow-blue-500/20"
              >
                {editingId === elem.id ? (
                  // Edit Mode
                  <div className="w-full flex flex-col gap-2 flex-1">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-2 py-1 bg-slate-700 border-2 border-blue-500 rounded text-white outline-none text-sm"
                    />
                    <textarea
                      value={editDetails}
                      onChange={(e) => setEditDetails(e.target.value)}
                      className="w-full px-2 py-1 bg-slate-700 border-2 border-blue-500 rounded text-white outline-none text-xs resize-none flex-1"
                    />
                    <div className="flex gap-2 w-full">
                      <button
                        onClick={() => saveEdit(elem.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 py-1 text-xs rounded font-bold text-white flex items-center justify-center gap-1 transition"
                      >
                        <Check size={14} /> Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 bg-slate-600 hover:bg-slate-700 py-1 text-xs rounded font-bold text-white flex items-center justify-center gap-1 transition"
                      >
                        <X size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Display Mode
                  <>
                    <div className="w-full">
                      <h3 className="leading-tight text-lg font-bold text-blue-400">
                        {elem.title}
                      </h3>
                      <p className="mt-3 leading-tight text-sm font-medium text-slate-300 line-clamp-3">
                        {elem.details}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">{elem.createdAt}</p>
                    </div>
                    <div className="flex gap-2 w-full">
                      <button
                        onClick={() => startEdit(elem)}
                        className="flex-1 cursor-pointer active:scale-95 bg-blue-600 hover:bg-blue-700 py-2 text-xs rounded font-bold text-white flex items-center justify-center gap-1 transition"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => deleteNote(elem.id)}
                        className="flex-1 cursor-pointer active:scale-95 bg-red-600 hover:bg-red-700 py-2 text-xs rounded font-bold text-white flex items-center justify-center gap-1 transition"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <p className="text-lg">
                {tasks.length === 0 ? "No notes yet. Create one!" : "No notes match your search."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
