import axios from "axios"
import { Telegraf } from 'telegraf'

export const sendMessage = async (name: string, phone: string) => {
    const bot = new Telegraf("6448195367:AAH3A_Sr_2d3-Lf8eY4gJsPOi7STD0CzM_0");
    let result = await bot.telegram.sendMessage("722658211", "Inscrição confirmada! \n\nNome: " + name + "\nTelefone: " + phone)
    console.log(result)
}

export default async function handler(req: any, res: any) {
    console.log(req)
    await sendMessage(req.body.name, req.body.phone)
    res.status(200).json({ name: 'John Doe' })
}