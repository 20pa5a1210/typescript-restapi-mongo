import express from "express"
import { get, merge } from 'lodash'

import { getUserBySessionToken } from "../db/users"

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'idenity._id') as string
        if (!currentUserId) {
            return res.status(400).send("NOT AUTHORISES")
        }

        if (currentUserId.toString() !== id) {
            return res.status(400).send("NOT AUTHORISES")
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(400)
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['TS-REST-API']
        if (!sessionToken) {
            return res.status(400).send("NOT AUTHORISES")
        }
        const existingUser = await getUserBySessionToken(sessionToken)
        if (!existingUser) {
            return res.status(403)
        }
        merge(req, { idenity: existingUser })
        return next()
    } catch (error: unknown) {
        console.log(error)
        return res.status(400)
    }

}