const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;
const db = require("./db.js");

class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static createUser(user, callback) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return callback(err);
      }
      const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(sql, [user.name, user.email, hash], (err, result) => {
        if (err) {
          return callback(err);
        }
        const token = jwt.sign(
          { id: result.insertId, name: user.name },
          secretKey
        );
        callback(null, token);
      });
    });
  }

  static getUserByEmail(email, callback) {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.length > 0) {
        const user = results[0];
        callback(null, new User(user.name, user.email, user.password));
      } else {
        callback(null, null);
      }
    });
  }

  static getUserById(id, callback) {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.length > 0) {
        const user = results[0];
        callback(null, new User(user.name, user.email));
      } else {
        callback(null, null);
      }
    });
  }

  static getAllUsers(callback) {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, results) => {

      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static async updateUser(id, data, callback) {
    bcrypt.hash(data.password, 10, (err, hashedPassword) => {
      if (err) {
        return callback(err, null);
      }
      const sql =
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
      db.query(
        sql,
        [data.name, data.email, hashedPassword, id],
        (err, results) => {
          if (err) {
            return callback(err, null);
          }
          if (results.affectedRows == 0) {
            // If no rows were affected, then the user was not found
            callback({ message: "Not found" });
            return;
          }
          callback(null, results);
        }
      );
    });
  }

//   static comparePassword(password, hash, callback) {
//     bcrypt.compare(password, hash, (err, isMatch) => {
//       if (err) {
//         return callback(err);
//       }
//       callback(null, isMatch);
//     });
//   }

  static loginUser(email, password, callback) {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.length === 0) {
        return callback(new Error("User not found"));
      }
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return callback(err);
        }
        if (!result) {
          return callback(new Error("Invalid password"));
        }
        const token = jwt.sign({ id: user.id }, secretKey);
        callback(null, token);
      });
    });
  }
}

module.exports = User;
