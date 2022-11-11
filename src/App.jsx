import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Error bro! Input ka lodicakes!");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Edited na, idol!");
    } else {
      showAlert(true, "success", "Sheesh! Yessir!");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show: show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "The list is empty now, pogi!");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "removed na po, opo!");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    showAlert(true, "success", "Edit na broskie!");
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);


  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <div className="form-control"><img src="https://www.pngmart.com/files/22/Louis-Vuitton-Logo-PNG-1.png" className="logo"></img>
        </div>
        <h3>Tindahan ni Aling Luisa de Viton</h3>
        <h2>Laysho Laysho Grocery</h2>
        <div className="form-control">
          <div>
            <input
              type="text"
              className="grocery"
              placeholder="e.g. Louis Vuitton Sardines"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit mo yarn?!" : "Forda go!"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}
export default App;
