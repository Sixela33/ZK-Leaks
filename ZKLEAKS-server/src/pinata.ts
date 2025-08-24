import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PinataSDK } from "pinata";



export function createPinata(server: FastifyInstance): FastifyInstance {
    server.get('/presigned_url', async (request: FastifyRequest, reply: FastifyReply) => {

        const pinata = new PinataSDK({
            pinataJwt: `${process.env.PINATA_JWT}`,
            pinataGateway: `${process.env.PINATA_GATEWAY_URL}`
        })

        try {
            const url = await pinata.upload.public.createSignedURL({
            expires: 30, // The only required param
            })
            reply.status(200).send({ url: url }); // Returns the signed upload URL
        } catch (error) {
            console.log(error);
            reply.status(500).send({ text: "Error creating API Key:" });
        }
    });

    server.get('/read_uri/:uri', async (request: FastifyRequest, reply: FastifyReply) => {
        const pinata = new PinataSDK({
            pinataJwt: `${process.env.PINATA_JWT}`,
            pinataGateway: `${process.env.PINATA_GATEWAY_URL}`
        })

        console.log("pinata", pinata)

        console.log("params", request.params)

        const { uri } = request.params as { uri: string }

        try {
            const file = await pinata.files.public.get(uri)
            reply.status(200).send({ file });
        } catch (error) {
            console.log(error);
            reply.status(500).send({ text: "Error reading URI:" });
        }
    })

    return server;
}
