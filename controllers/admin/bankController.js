"use-strict";

const fs = require("fs-extra");
const path = require("path");

const BankModel = require("../../models/Bank");

module.exports = {
  index: async (req, res) => {
    try {
      const banks = await BankModel.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("pages/admin/bank/index", {
        title: "Staycation | Bank",
        user: req.session.user,
        banks,
        alert,
      });
    } catch (error) {
      res.redirect("/admin/bank");
    }
  },

  store: async (req, res) => {
    try {
      const bank = await BankModel.create({
        ...req.body,
        imageUrl: `images/bank/${req.file.filename}`,
      });

      req.flash("alertMessage", `Bank ${bank.bank} successfully added`);
      req.flash("alertStatus", "success");

      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/bank");
    }
  },

  update: async (req, res) => {
    try {
      const { id, bank, accountNumber, name } = req.body;

      const banking = await BankModel.findById(id);
      if (req.file != undefined) {
        await fs.unlink(path.join(`public/${banking.imageUrl}`));
        banking.imageUrl = `images/bank/${req.file.filename}`;
      }

      banking.bank = bank;
      banking.accountNumber = accountNumber;
      banking.name = name;
      await banking.save();

      req.flash("alertMessage", `Bank ${banking.name} successfully updated`);
      req.flash("alertStatus", "success");

      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/bank");
    }
  },

  destroy: async (req, res) => {
    try {
      const bank = await BankModel.findById(req.params.id);

      await fs.unlink(path.join(`public/${bank.imageUrl}`));
      await bank.remove();

      req.flash("alertMessage", `Bank ${bank.name} successfully updated`);
      req.flash("alertStatus", "success");

      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "error");

      res.redirect("/admin/bank");
    }
  },
};
