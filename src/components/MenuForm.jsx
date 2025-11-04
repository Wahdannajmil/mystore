import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";

const MenuForm = ({ onAddMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !price) {
      alert("Harap isi semua kolom!");
      return;
    }

    const newMenu = {
      name,
      category,
      price: Number(price),
      description: "",
      available: true,
    };

    onAddMenu(newMenu);
    setName("");
    setCategory("");
    setPrice("");
    setIsOpen(false);
  };

  return (
    <div className="bg-white shadow border rounded-xl p-4">
      {/* Header dropdown */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center text-left text-gray-700 font-semibold text-base hover:text-rose-500 transition"
      >
        <div className="flex items-center gap-2">
          <FiPlus className="text-rose-500" />
          Tambah Produk Baru
        </div>
        {isOpen ? (
          <FiChevronUp className="text-gray-500" />
        ) : (
          <FiChevronDown className="text-gray-500" />
        )}
      </button>

      {/* Dropdown form */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] mt-4" : "max-h-0"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Es Kopi Susu"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Kategori Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-rose-400 outline-none"
            >
              <option value="">Pilih Kategori</option>
              <option value="Rokok">Rokok</option>
              <option value="Bahan Dapur">Bahan Dapur</option>
              <option value="Makanan">Makanan</option>
            </select>
          </div>

          {/* Harga */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Harga
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Contoh: 15000"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none"
            />
          </div>

          {/* Tombol Simpan */}
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
          >
            Simpan Produk
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
