function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // Store it inside a database
    const newMessage = {
      email,
      name,
      message,
    };

    console.log(newMessage);

    res.status(201).json({ message: "Successfully Stored Message!", data: newMessage });
  }
}
