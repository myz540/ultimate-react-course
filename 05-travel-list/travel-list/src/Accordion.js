import "./Accordion.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  let updatedItems = faqs
    .slice()
    .map((x, idx) => ({ ...x, id: idx + 1, open: false }));

  const [items, setItems] = useState(updatedItems);

  function handleOpenItem(item) {
    setItems(() =>
      items.map((x) => ({ ...x, open: x.id === item.id ? !x.open : x.open }))
    );
  }

  return (
    <div>
      <Accordion items={items} onOpenItem={handleOpenItem} />
    </div>
  );
}

function Accordion({ items, onOpenItem }) {
  return (
    <div className="accordion">
      <ul className="accordion">
        {items.map((i) => (
          <AccordionItem item={i} onOpenItem={onOpenItem} />
        ))}
      </ul>
    </div>
  );
}

function AccordionItem({ item, onOpenItem }) {
  return (
    <div
      className={item.open ? "item open" : "item"}
      onClick={() => onOpenItem(item)}
    >
      <p className="number">{item.id}</p>
      <p className="text">{item.title}</p>
      <p className="icon"></p>
      <div className="content-box">{item.open ? item.text : ""}</div>
    </div>
  );
}
