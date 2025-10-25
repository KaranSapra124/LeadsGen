import Leads from "../Model/Leads.js"

export const createLead = async (req, res) => {
    const leadData = {
        name: req.body.name,
        email: req.body.email,
        status: req.body.status,
        aiMessage: req.body.aiMessage
    }
    try {
        await Leads.create(leadData);
        return res.status(200).send({ message: "Lead Created!" })
    }
    catch (err) {
        return res.status(401).send({ message: `Error while creating lead: ${err}` })
    }

}
export const getLeads = async (req, res) => {
    try {
        const leads = await Leads.find()
        return res.status(200).send({ message: "Leads Fetched!", leads })
    }
    catch (err) {
        return res.status(401).send({ message: `Error while getting leads: ${err}` })
    }
}

