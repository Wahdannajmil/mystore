import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MenuCard from "./components/MenuCard";
import MenuForm from "./components/MenuForm";

const App = () => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "https://6902c846b208b24affe739f8.mockapi.io/store/products";

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(API_URL);
      setMenus(response.data);
      setFilteredMenus(response.data);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = menus.filter((menu) =>
      menu.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMenus(filtered);
  };

  const handleAddMenu = async (newMenu) => {
    try {
      const response = await axios.post(API_URL, newMenu);
      // langsung tambahkan ke state tanpa fetch ulang
      const updatedMenus = [...menus, response.data];
      setMenus(updatedMenus);
      setFilteredMenus(updatedMenus);
    } catch (error) {
      console.error("❌ Gagal menambah data:", error);
    }
  };

  // ✅ Fungsi untuk update data lokal setelah edit
  const handleLocalUpdate = (updatedMenu) => {
    const updatedMenus = menus.map((menu) =>
      menu.id === updatedMenu.id ? updatedMenu : menu
    );
    setMenus(updatedMenus);

    // jika sedang mencari sesuatu, filter ulang juga
    const updatedFiltered = updatedMenus.filter((menu) =>
      menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMenus(updatedFiltered);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-rose-600 mb-6">
        Daftar Harga
      </h1>

      <div className="max-w-3xl mx-auto mb-6">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>

      <div className="max-w-md mx-auto mb-8">
        <MenuForm onAddMenu={handleAddMenu} />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredMenus.length > 0 ? (
          filteredMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              onLocalUpdate={handleLocalUpdate} // ✅ kirim ke child
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            Menu tidak ditemukan.
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
