import React, { useState } from "react";
import axios from "axios";
import { FiEdit2, FiCheck, FiX, FiLoader } from "react-icons/fi";

const MenuCard = ({ menu, onLocalUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: menu.name,
    category: menu.category,
    price: menu.price,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = `https://6902c846b208b24affe739f8.mockapi.io/store/products/${menu.id}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.price) {
      setError("⚠️ Semua kolom wajib diisi!");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await axios.put(API_URL, {
        ...menu,
        ...form,
        price: +form.price,
      });
      onLocalUpdate?.(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Gagal update:", err);
      setError("❌ Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 border border-gray-100 relative">

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-3 right-3 text-gray-400 hover:text-rose-500 transition"
          disabled={loading}
        >
          <FiEdit2 size={18} />
        </button>
      )}

      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama produk"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
            disabled={loading}
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Kategori"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
            disabled={loading}
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Harga"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
            disabled={loading}
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="flex justify-end gap-3 mt-3">
            <button
              onClick={handleSave}
              disabled={loading}
              className="text-green-600 hover:text-green-700 flex items-center gap-1"
              title="Simpan"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" size={16} />
                  <span className="text-sm">Menyimpan...</span>
                </>
              ) : (
                <FiCheck size={18} />
              )}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="text-gray-500 hover:text-gray-700"
              title="Batal"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-gray-800 text-base">
            {menu.name}
          </h3>
          <p className="text-gray-500 text-sm">{menu.category}</p>
          <p className="text-rose-600 font-bold mt-1 text-sm">
            Rp {menu.price?.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
