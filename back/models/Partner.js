const db = require("./db.js");

class Partner {
  constructor(name, address, email, phone) {
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
  }

  static createPartner(partner, callback) {
    const sql =
      "INSERT INTO partners (name, address, email, phone) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [partner.name, partner.address, partner.email, partner.phone],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result.insertId);
      }
    );
  }

  static getPartnerById(id, callback) {
    const sql = "SELECT * FROM partners WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.length === 0) {
        return callback(new Error("Partner not found"));
      }
      const partner = results[0];

      callback(
        null,
        new Partner(partner.name,partner.address, partner.email, partner.phone)
      );
    });
  }
  static getAllPartners(callback) {
    const sql = "SELECT * FROM partners";
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  static updatePartner(id, partner, callback) {
    db.query(
      "UPDATE partners SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?",
      [partner.name, partner.address, partner.email, partner.phone, id],
      (err, res) => {
        if (err) {
          return callback(err, null);
        }
        if (res.affectedRows == 0) {
          // If no rows were affected, then the partner was not found
          return callback({ message: "Partner not found" }, null);
        }
        callback(null, res);
      }
    );
  }
  static deletePartner(id, callback) {
    db.query(
      "DELETE FROM partners WHERE id = ?",
      [id],
      (err, res) => {
        if (err) {
          return callback(err, null);
        }
        if (res.affectedRows == 0) {
          // If no rows were affected, then the partner was not found
          return callback({ message: "Partner not found" }, null);
        }
        callback(null, res);
      }
    );
  }


}
module.exports = Partner;
