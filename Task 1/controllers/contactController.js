const pool = require('../db/database');
const {
    createContactInCRM,
    getContactFromCRM,
    updateContactInCRM,
    deleteContactFromCRM,
} = require('../services/crmService');

const createContact = async (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;

    try {
        if (data_store === 'CRM') {
            const response = await createContactInCRM({ first_name, last_name, email, mobile_number });
            console.log(response)
            res.status(201).json(response);
        } else if (data_store === 'DATABASE') {
            const result = await pool.query(
                'INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES ($1, $2, $3, $4) RETURNING *',
                [first_name, last_name, email, mobile_number]
            );
            res.status(201).json(result.rows[0]);
        } else {
            res.status(400).json({ error: 'Invalid data_store value' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getContact = async (req, res) => {
    const { contact_id, data_store } = req.body;

    try {
        if (data_store === 'CRM') {
            const response = await getContactFromCRM(contact_id);
            res.status(200).json(response);
        } else if (data_store === 'DATABASE') {
            const result = await pool.query('SELECT * FROM contacts WHERE id = $1', [contact_id]);
            if (result.rows.length > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).json({ error: 'Contact not found' });
            }
        } else {
            res.status(400).json({ error: 'Invalid data_store value' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateContact = async (req, res) => {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;

    try {
        if (data_store === 'CRM') {
            const response = await updateContactInCRM(contact_id, { email: new_email, mobile_number: new_mobile_number });
            res.status(200).json(response);
        } else if (data_store === 'DATABASE') {
            const result = await pool.query(
                'UPDATE contacts SET email = $1, mobile_number = $2 WHERE id = $3 RETURNING *',
                [new_email, new_mobile_number, contact_id]
            );
            if (result.rows.length > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).json({ error: 'Contact not found' });
            }
        } else {
            res.status(400).json({ error: 'Invalid data_store value' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteContact = async (req, res) => {
    const { contact_id, data_store } = req.body;

    try {
        if (data_store === 'CRM') {
            await deleteContactFromCRM(contact_id);
            res.status(204).send();
        } else if (data_store === 'DATABASE') {
            const result = await pool.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [contact_id]);
            if (result.rows.length > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Contact not found' });
            }
        } else {
            res.status(400).json({ error: 'Invalid data_store value' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
