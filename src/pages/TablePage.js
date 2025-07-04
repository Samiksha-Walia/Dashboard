import React, { useState } from 'react';
import defaultAvatar from '../data/avatar.jpg';
import defaultAvatar3 from '../data/avatar3.jpg';
import defaultAvatar4 from '../data/avatar4.jpg';

const initialData = [
  { name: 'Alice', age: 25, avatar: defaultAvatar },
  { name: 'Bob', age: 30, avatar: defaultAvatar3 },
  { name: 'Charlie', age: 28, avatar: defaultAvatar4 },
];

const TablePage = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', age: '', avatar: null });
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({ name: '', age: '', avatar: null });

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewUser({ ...newUser, avatar: URL.createObjectURL(file) });
    }
  };

  const handleEditAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditUser({ ...editUser, avatar: URL.createObjectURL(file) });
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
    setData([
      ...data,
      {
        name: newUser.name.trim(),
        age: parseInt(newUser.age),
        avatar: newUser.avatar || defaultAvatar,
      },
    ]);
    setNewUser({ name: '', age: '', avatar: null });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditUser({ ...data[index] });
  };

  const handleSave = (index) => {
    const updated = [...data];
    updated[index] = {
      ...editUser,
      age: parseInt(editUser.age),
      avatar: editUser.avatar || defaultAvatar,
    };
    setData(updated);
    setEditIndex(null);
    setEditUser({ name: '', age: '', avatar: null });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditUser({ name: '', age: '', avatar: null });
  };

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Table</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />

      <div className="mb-4 flex flex-wrap gap-2">
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
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="p-2 border rounded"
        />
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add User
        </button>
      </div>

      <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
  <thead className="bg-gray-100 dark:bg-gray-700 text-left">
    <tr>
      <th
        className="py-3 px-6 border-b cursor-pointer w-1/3"
        onClick={() => handleSort('name')}
      >
        Name {sortBy === 'name' && (sortAsc ? '↑' : '↓')}
      </th>
      <th
        className="py-3 px-6 border-b cursor-pointer w-1/6"
        onClick={() => handleSort('age')}
      >
        Age {sortBy === 'age' && (sortAsc ? '↑' : '↓')}
      </th>
      <th className="py-3 px-6 border-b w-1/3 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.length > 0 ? (
      filteredData.map((row, index) => (
        <tr
          key={index}
          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <td className="py-3 px-6 border-b flex items-center gap-3">
            {editIndex === index ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditAvatarChange}
                  className="w-28"
                />
                {editUser.avatar && (
                  <img
                    src={editUser.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  className="p-1 border rounded flex-1"
                />
              </>
            ) : (
              <>
                {row.avatar && (
                  <img
                    src={row.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <span className="font-medium">{row.name}</span>
              </>
            )}
          </td>
          <td className="py-3 px-6 border-b align-middle">
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
              <span>{row.age}</span>
            )}
          </td>
          <td className="py-3 px-6 border-b text-center">
            {editIndex === index ? (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleSave(index)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          className="py-3 px-6 border-b text-center text-gray-500"
          colSpan="3"
        >
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
