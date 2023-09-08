import React from "react";
import ReactDom from "react-dom/client";
import pizzaData from "./data";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div>
      <header className="header">
        <h1>Fast React Pizza Company</h1>
      </header>
    </div>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Menu</h2>
      <React.Fragment>
        <p>This is a restaurant I suppose</p>
        <ul className="pizzas">
          {pizzaData.map((p) => (
            <Pizza pizza={p} key={p.name} />
          ))}
        </ul>
      </React.Fragment>
    </main>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer">
      {isOpen ? <Order closeHour={closeHour} /> : "Sorry we're closed"}
    </footer>
  );
}

function Order(props) {
  return (
    <div className="order">
      <p>We're Open until {props.closeHour}:00</p>
      <button className="btn">Order</button>
    </div>
  );
}

function Pizza({ pizza }) {
  return (
    <li className={pizza.soldOut ? "pizza sold-out" : "pizza"}>
      <img src={pizza.photoName} alt={pizza.name}></img>
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? "Sold out" : pizza.price}</span>
      </div>
    </li>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
