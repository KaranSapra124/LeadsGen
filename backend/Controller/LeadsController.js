import Leads from "../Model/Leads.js"
import { genAILeadsScore } from "../Utils/utils.js"

export const createLead = async (req, res) => {
    const leadData = {
        name: req.body.name,
        email: req.body.email,
        status: req?.body?.status,
        aiMessage: req.body.aiMessage
    }
    try {
        const score = await genAILeadsScore(leadData?.aiMessage)

        await Leads.create({ ...leadData, leadScore: +score });
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
export const deleteLead = async (req, res) => {

    try {
        console.log(req.params.id)
        const leads = await Leads.findByIdAndDelete(req.params.id)
        return res.status(200).send({ message: "Leads Fetched!", leads })
    }
    catch (err) {
        return res.status(401).send({ message: `Error while getting leads: ${err}` })
    }
}
export const editLead = async (req, res) => {
    const leadData = {
        name: req.body.name,
        email: req.body.email,
        status: req.body.status,
        aiMessage: req.body.aiMessage
    }
    try {
        await Leads.findByIdAndUpdate(req.params.id, leadData);
        return res.status(200).send({ message: "Lead Updated!" })
    }
    catch (err) {
        return res.status(401).send({ message: `Error while updating lead: ${err}` })
    }
}


