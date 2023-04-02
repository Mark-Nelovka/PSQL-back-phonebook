const express = require("express");

const { Reqistration, Login } = require("../controllers/auth");
// const contactsRouter = require("./routes/api/contacts");

const router = express.Router();

router.post("/reqistration", Reqistration);
router.post("/login", Login);
// router.get("/logout", checkAuth, ctrlWrapper(logout));
// router.patch(
//   "/avatars",
//   checkAuth,
//   upload.single("avatars"),
//   ctrlWrapper(changeAvatar)
// );

// router.get("/verify/:verificationToken", ctrlWrapper(verifyUser));

module.exports = router;
