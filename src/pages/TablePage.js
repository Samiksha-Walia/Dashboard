import React, { useState } from 'react';

const initialData = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 28 },
];

const TablePage = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', age: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({ name: '', age: '' });

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const filteredData = data
    .filter((row) => row.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === 'string') {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortAsc ? aVal - bVal : bVal - aVal;
    });

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.age) return;
    setData([...data, { name: newUser.name.trim(), age: parseInt(newUser.age) }]);
    setNewUser({ name: '', age: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditUser(data[index]);
  };

  const handleSave = (index) => {
    const updated = [...data];
    updated[index] = { ...editUser, age: parseInt(editUser.age) };
    setData(updated);
    setEditIndex(null);
    setEditUser({ name: '', age: '' });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditUser({ name: '', age: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Table</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />

      {/* Add User Form */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add User
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th
              className="py-2 px-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleSort('name')}
            >
              Name {sortBy === 'name' && (sortAsc ? '↑' : '↓')}
            </th>
            <th
              className="py-2 px-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleSort('age')}
            >
              Age {sortBy === 'age' && (sortAsc ? '↑' : '↓')}
            </th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editUser.name}
                      onChange={(e) =>
                        setEditUser({ ...editUser, name: e.target.value })
                      }
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={editUser.age}
                      onChange={(e) =>
                        setEditUser({ ...editUser, age: e.target.value })
                      }
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    row.age
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editIndex === index ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(index)}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-2 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border-b text-center" colSpan="3">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
