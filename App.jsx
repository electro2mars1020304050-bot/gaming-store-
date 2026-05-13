import { useEffect, useState } from "react";

export default function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const [games, setGames] = useState([
    { id: 1, name: "GTA V Account", price: 15 },
    { id: 2, name: "FC 26 Account", price: 20 },
    { id: 3, name: "Call of Duty Account", price: 18 }
  ]);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game) => setCart([...cart, game]);

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const loginAdmin = () => {
    if (password === "admin123") setIsAdmin(true);
    else alert("Wrong password");
  };

  const addProduct = () => {
    if (!newName || !newPrice) return;

    setGames([
      ...games,
      { id: Date.now(), name: newName, price: Number(newPrice) }
    ]);

    setNewName("");
    setNewPrice("");
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 20 }}>
      <h1>MK Gaming Store</h1>

      <h2>Products</h2>
      {games.map(g => (
        <div key={g.id} style={{ marginBottom: 10 }}>
          <b>{g.name}</b> - ${g.price}
          <button onClick={() => addToCart(g)} style={{ marginLeft: 10 }}>Add</button>
        </div>
      ))}

      <h2>Cart ({cart.length})</h2>
      {cart.map((c, i) => (
        <div key={i}>
          {c.name} - ${c.price}
          <button onClick={() => removeFromCart(i)}>X</button>
        </div>
      ))}

      <h3>Total: ${total}</h3>

      <h2>Admin</h2>
      {!isAdmin ? (
        <div>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={loginAdmin}>Login</button>
        </div>
      ) : (
        <div>
          <input placeholder="name" onChange={(e) => setNewName(e.target.value)} />
          <input placeholder="price" onChange={(e) => setNewPrice(e.target.value)} />
          <button onClick={addProduct}>Add</button>
        </div>
      )}
    </div>
  );
}
