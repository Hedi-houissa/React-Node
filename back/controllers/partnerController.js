const jwt = require("jsonwebtoken");
const Partner = require("../models/Partner");

function createPartner(req, res) {
  const partner = req.body;
  Partner.createPartner(partner, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id });
  });
}

function getPartnerById(req, res) {
  const id = req.params.id;
  Partner.getPartnerById(id, (err, partner) => {
    if (err) {
      return res.status(404).json({ error: err.message });
    }
    res.json(partner);
  });
}

function getAllPartners(req, res) {
  Partner.getAllPartners((err, partners) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(partners);
  });
}
async function updatePartner(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "Partner not found" });
  }

  Partner.updatePartner(id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Partner updated successfully" });
  });
}
async function deletePartner(req, res) {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "Partner not found" });
  }

  Partner.deletePartner(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Partner deleted successfully" });
  });
}



module.exports = {
  createPartner,
  getPartnerById,
  getAllPartners,
  updatePartner,
  deletePartner
};
