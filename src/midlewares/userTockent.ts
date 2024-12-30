const jwt = require("jsonwebtoken");

// Tạo một token
const token = jwt.sign({ userId: 1 }, "your_secret_key", { expiresIn: "1h" });

// Xác thực token
try {
  const decoded = jwt.verify(token, "your_secret_key");
  console.log(decoded);
} catch (err) {
  console.error("Token không hợp lệ", err);
}
