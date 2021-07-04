import { PrismaClient } from "@prisma/client";
import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const prisma = new PrismaClient();

export const createUser = functions.https.onRequest(
  async (request, response) => {
    if (request.method == "POST") {
      await prisma.user.create({
        data: {
          email: request.body.email,
          name: request.body.name,
        },
      });
      response.status(200).send("success!");
    } else {
      response.status(403).send("forbidden!");
    }
  }
);
