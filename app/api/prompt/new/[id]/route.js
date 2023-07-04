import {connectToDB} from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("prompt not found", {
            status: 404
        })
        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (e) {
        return new Response("failed to fetch this prompt", {
            status: 500
        })
    }
}
export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!prompt) return new Response("prompt not found", {
            status: 404
        })
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        })
    } catch (e) {
        return new Response("failed to update the prompt", {
            status: 500
        })
    }
}
export const DELETE = async (req, {params}) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted succesfully", {
            status: 200
        })
    } catch (e) {
        return new Response("failed to delete the prompt", {
            status: 500
        })
    }
}
