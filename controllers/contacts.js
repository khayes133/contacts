const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

/**
 * @swagger
 * tags:
 *   - name: Contacts
 *     description: Operations related to contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successful response
 */
const getAll = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .findOne({ _id: userId });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json('Contact not found.');
    }
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 */
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const result = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .insertOne(contact);

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json('Some error occurred while creating the contact.');
  }
};

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Contact'
 *     responses:
 *       204:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Some error occurred while updating the contact
 */
const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .updateOne({ _id: userId }, { $set: contact });

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Contact not found.');
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json(error.message || 'An error occurred while updating the contact.');
  }
};

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Some error occurred while deleting the contact
 */
const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json('Contact not found.');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json(error.message || 'An error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
