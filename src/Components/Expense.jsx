import React, { useRef, useState } from "react";

const Exam = () => {
  const nameRef = useRef();
  const dateRef = useRef();
  const creditRef = useRef();
  const debitRef = useRef();
  const placeRef = useRef();
  const userRef = useRef();

  const [entries, setEntries] = useState([]);

  const handleAdd = () => {
    const entry = {
      name: nameRef.current.value,
      date: dateRef.current.value,
      credit: parseFloat(creditRef.current.value) || 0,
      debit: parseFloat(debitRef.current.value) || 0,
      place: placeRef.current.value,
      user: userRef.current.value
    };

    if (!entry.name || !entry.date) {
      alert("Please enter name and date");
      return;
    }

    setEntries((prev) => [...prev, entry]);

    // Clear input fields
    nameRef.current.value = "";
    dateRef.current.value = "";
    creditRef.current.value = "";
    debitRef.current.value = "";
    placeRef.current.value = "";
    userRef.current.value = "";
  };

  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };

  // Total calculation without reduce
  let totalCredit = 0;
  let totalDebit = 0;
  entries.forEach((entry) => {
    totalCredit += entry.credit;
    totalDebit += entry.debit;
  });

  const balance = totalCredit - totalDebit;

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <div className="form">
        <input ref={nameRef} placeholder="Expense Name" />
        <input ref={dateRef} type="date" />
        <input ref={creditRef} type="number" placeholder="Credit" />
        <input ref={debitRef} type="number" placeholder="Debit" />
        <input ref={placeRef} placeholder="Place" />
        <input ref={userRef} placeholder="User" />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="summary">
        <h3>Total Credit: ₹{totalCredit}</h3>
        <h3>Total Debit: ₹{totalDebit}</h3>
        <h3>Balance: ₹{balance}</h3>
      </div>

      {entries.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Place</th>
              <th>User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.date}</td>
                <td>{entry.credit}</td>
                <td>{entry.debit}</td>
                <td>{entry.place}</td>
                <td>{entry.user}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Exam;