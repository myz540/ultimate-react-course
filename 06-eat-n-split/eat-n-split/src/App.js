import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSplitBill(balance) {
    setFriends((friends) =>
      friends.map((f) =>
        f.id === selectedFriend?.id ? { ...f, balance: f.balance + balance } : f
      )
    );
    setSelectedFriend(null);
  }

  function friendFormHandler(newFriend) {
    setFriends([...friends, newFriend]);
  }

  function selectFriendHandler(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }

  return (
    <div className="app">
      <FriendList
        friends={friends}
        onAddFriend={friendFormHandler}
        onSelectFriend={selectFriendHandler}
        selectedFriend={selectedFriend}
      />
      {selectedFriend && (
        <SplitBillForm
          friend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onAddFriend, onSelectFriend, selectedFriend }) {
  const [showFriendForm, setShowFriendForm] = useState(false);

  return (
    <div className="sidebar">
      <ul className="sidebar">
        List of Friends
        {friends.map((f) => (
          <Friend
            friend={f}
            key={f.id}
            onSelectFriend={onSelectFriend}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
      {showFriendForm ? <FriendForm onAddFriend={onAddFriend} /> : ""}
      <button className="button" onClick={() => setShowFriendForm((s) => !s)}>
        {showFriendForm ? "Close" : "Add Friend"}
      </button>
    </div>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  function getBalanceMessage(balance) {
    if (balance === 0) return <p>You are even</p>;
    else if (balance < 0)
      return (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      );
    else
      return (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      );
  }
  return (
    <li className={isSelected ? "selected" : ""}>
      <h3>{friend.name}</h3>
      {getBalanceMessage(friend.balance)}
      <img src={friend.image} alt={friend.name}></img>
      <button className="button" onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

function FriendForm({ onAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmission(e) {
    e.preventDefault();

    const newFriend = {
      id: Math.floor(Math.random() * 1000000),
      name: friendName,
      image: imageUrl,
      balance: 0,
    };

    onAddFriend(newFriend);
    setFriendName("");
    setImageUrl("");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmission}>
      <label>👯Friend Name</label>
      <input
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        placeholder="friend name..."
      />
      <label>🇺🇸Image URL</label>
      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="image url..."
      />
      <button className="button">Add</button>
    </form>
  );
}

function SplitBillForm({ friend, onSplitBill }) {
  const [billValue, setBillValue] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const theirExpense = billValue ? billValue - yourExpense : 0;
  const [whoPay, setWhoPay] = useState("You");

  function handleSubmission(e) {
    e.preventDefault();

    if (!billValue || !yourExpense) return;
    onSplitBill(whoPay === "You" ? theirExpense : -yourExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmission}>
      <h2>Split a bill with {friend.name}</h2>
      <span>Bill Value💰</span>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      ></input>
      <span>Your expense💰</span>
      <input
        style={whoPay === friend.name ? { backgroundColor: "#CDCDCD" } : {}}
        type="text"
        value={yourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > billValue
              ? yourExpense
              : Number(e.target.value)
          )
        }
      ></input>
      <span>{friend.name}'s expense💰</span>
      <input
        type="text"
        style={whoPay === "You" ? { backgroundColor: "#CDCDCD" } : {}}
        value={theirExpense}
        disabled
      ></input>
      <span>Who is paying?</span>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option>You</option>
        <option>{friend.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}
