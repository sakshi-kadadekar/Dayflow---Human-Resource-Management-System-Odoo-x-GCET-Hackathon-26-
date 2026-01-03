const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Pehla Route
app.get('/', (req, res) => {
    res.send("Dayflow Server is Active on 5001! 🚀");
});

// Signup Route
app.post('/api/signup', (req, res) => {
    console.log("Signup Data:", req.body);
    res.json({ success: true, message: "Account Created Successfully on Port 5001!" });
});

// Port change to 5001 for Mac
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`✅ Server is PERMANENTLY running on http://localhost:${PORT}`);
});