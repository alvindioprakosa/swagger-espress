let users = [
  { id: 1, name: "user 1", email: "User@email.com" },
  { id: 2, name: "user 2", email: "User2@email.com" },
  { id: 3, name: "user 3", email: "User3@email.com" },
];

// GET all users
export const getAll = (req, res) => {
  res.json(users);
};

// GET user by ID
export const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// CREATE user
export const create = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// UPDATE user
export const update = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  users[index] = { ...users[index], name, email };
  res.json(users[index]);
};

// DELETE user
export const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "User not found" });

  const deletedUser = users[index];
  users = users.filter((u) => u.id !== id);
  res.json(deletedUser);
};
