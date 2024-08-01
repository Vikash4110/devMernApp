const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updatedUserData }
    );
    if (updatedData.nModified === 0) {
      return res.status(404).json({ message: "User not found or data unchanged" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Contact.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};


const getAllService = async (req, res, next) => {
  try {
    const services = await Service.find();
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }
    res.status(200).json({ services });
  } catch (error) {
    next(error);
  }
};

const deleteServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await Service.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(200).json({ message: "Service Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const addService = async (req, res, next) => {
  try {
    const { service, description, price, provider } = req.body;
    const newService = new Service({ service, description, price, provider });
    await newService.save();
    return res.status(201).json({ message: "Service Added Successfully" });
  } catch (error) {
    next(error);
  }
};

const getServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const service = await Service.findOne({ _id: id });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(200).json(service);
  } catch (error) {
    next(error);
  }
};

const updateServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedServiceData = req.body;
    const updatedData = await Service.updateOne(
      { _id: id },
      { $set: updatedServiceData }
    );
    if (updatedData.nModified === 0) {
      return res.status(404).json({ message: "Service not found or data unchanged" });
    }
    return res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById, getAllService,deleteServiceById, addService, getServiceById, updateServiceById };
