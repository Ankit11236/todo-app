import React, { useEffect, useRef, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

// Retrieve local data
const localData = () => {
  const list = localStorage.getItem("data");
  return list ? JSON.parse(list) : [];
};

const App = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(localData());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  // Delete item
  const deleteData = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  // Edit item
  const editData = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    setInput(itemToEdit.name);
    setToggleBtn(false);
    setEditId(id);
    inputRef.current.focus();
  };

  // Add or update item
  const handleItems = () => {
    if (!input) {
      alert("Please fill in the box");
    } else if (toggleBtn) {
      const inputData = { id: new Date().getTime().toString(), name: input };
      setItems([...items, inputData]);
      setInput("");
      inputRef.current.focus();
    } else {
      const updatedItems = items.map((item) => {
        if (item.id === editId) {
          return { ...item, name: input };
        }
        return item;
      });
      setItems(updatedItems);
      setInput("");
      setToggleBtn(true);
      setEditId(null);
      inputRef.current.focus();
    }
  };

  // Focus input when add icon is clicked
  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(items));
  }, [items]);

  return (
    <div className="bg-[#061525] w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[400px] h-[60px] flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
          className="w-[300px] h-[60px] rounded-lg"
        />
        {toggleBtn ? (
          <GrAdd
            className="bg-white mt-4 ml-[-2rem] text-[1.3rem] cursor-pointer"
            onClick={() => {
              handleItems();
              focusInput();
            }}
          />
        ) : (
          <AiFillEdit
            className="bg-white mt-4 ml-[-2rem] text-[1.3rem] cursor-pointer"
            onClick={() => {
              handleItems();
              focusInput();
            }}
          />
        )}
      </div>
      <div>
        {items.map((val) => (
          <div
            key={val.id}
            className="text-white font-semibold bg-[#101298] w-[300px] h-[60px] mt-[2rem] ml-[-6rem] rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex-grow truncate">
              <h1>{val.name}</h1>
            </div>
            <div className="flex-shrink-0 flex space-x-4">
              <AiFillEdit onClick={() => editData(val.id)} />
              <AiFillDelete onClick={() => deleteData(val.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
