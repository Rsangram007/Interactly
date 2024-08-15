const axios = require('axios');
require('dotenv').config();

const createContactInCRM = async (contact) => {
    const response = await axios.post(
        process.env.FRESHSALES_API_URL,
        { contact },
        {
            headers: {
                Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
                'Content-Type': 'application/json',
            },
        } 
    ); 
    return response.data;
};

const getContactFromCRM = async (contactId) => {
    const response = await axios.get(
        `${process.env.FRESHSALES_API_URL}/${contactId}`,
        {
            headers: {
                Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
            },
        }
    );
    return response.data;
};

const updateContactInCRM = async (contactId, contact) => {
    const response = await axios.put(
        `${process.env.FRESHSALES_API_URL}/${contactId}`,
        { contact },
        {
            headers: {
                Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};

const deleteContactFromCRM = async (contactId) => {
    const response = await axios.delete(
        `${process.env.FRESHSALES_API_URL}/${contactId}`,
        {
            headers: {
                Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
            },
        }
    );
    return response.data;
};

module.exports = {
    createContactInCRM,
    getContactFromCRM,
    updateContactInCRM,
    deleteContactFromCRM,
};
