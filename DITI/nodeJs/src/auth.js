// const express = require('express');
// const router = express.Router();
// const { ethers, verifyMessage } = require("ethers")
import { verifyMessage } from "ethers"

export function verifyLoginMessage(walletAddress, originalMessage, signedMessage) {
    const recoveredAddress = verifyMessage(originalMessage, signedMessage)
    if (walletAddress == recoveredAddress) {
        return true
    }
    return false
}