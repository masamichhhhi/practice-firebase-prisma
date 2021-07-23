import { PrismaClient } from "@prisma/client";
import * as functions from "firebase-functions";

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

export const getUsers = functions.https.onRequest(async (request, response) => {
  if (request.method == "GET") {
    const getUsersResponse = await prisma.user.findMany();
    response.status(200).send(getUsersResponse);
  } else {
    response.status(403).send("forbidden!");
  }
});

export const updateUser = functions.https.onRequest(
  async (request, response) => {
    if (request.method == "POST") {
      if (!request.body.userId) {
        response.status(400).send("userId should be passed in parameter");
        return;
      }

      const updateUserResponse = await prisma.user.update({
        where: {
          id: request.body.userId,
        },
        data: {
          email: request.body.email,
          name: request.body.name,
        },
      });
      response.status(200).send(updateUserResponse);
    } else {
      response.status(403).send("forbidden!");
    }
  }
);

export const deleteUser = functions.https.onRequest(
  async (request, response) => {
    if (request.method == "POST") {
      if (!request.body.userId) {
        response.status(400).send("userId should be passed in parameter");
        return;
      }
      const deleteUserResponse = await prisma.user.delete({
        where: {
          id: Number(request.body.userId),
        },
      });
      response.status(200).send(deleteUserResponse);
    } else {
      response.status(403).send("forbidden!");
    }
  }
);

export const createTodo = functions.https.onRequest(
  async (request, response) => {
    if (request.method == "POST") {
      if (
        !request.body.deadline ||
        !request.body.title ||
        !request.body.userId
      ) {
        response.status(400).send("bad request");
        return;
      }
      await prisma.todo.create({
        data: {
          deadline: new Date(request.body.deadline),
          title: request.body.title,
          assignee: {
            connect: {
              id: request.body.userId,
            },
          },
        },
      });
      response.status(200).send("success!");
    } else {
      response.status(403).send("forbidden!");
    }
  }
);

export const getTodos = functions.https.onRequest(async (request, response) => {
  if (request.method == "GET") {
    const getTodosResponse = await prisma.todo.findMany({
      where: {
        assigneeId: request.params.userId
          ? Number(request.params.userId)
          : undefined,
      },
    });
    response.status(200).send(getTodosResponse);
  } else {
    response.status(403).send("forbidden!");
  }
});

export const updateTodo = functions.https.onRequest(
  async (request, response) => {
    if (request.method == "POST") {
      if (!request.body.todoId) {
        response.status(400).send("todoId should be passed in parameter");
        return;
      }

      const updateUserResponse = await prisma.todo.update({
        where: {
          id: request.body.todoId,
        },
        data: {
          title: request.body.title,
          deadline: new Date(request.body.deadline),
          done: request.body.done === "true",
        },
      });
      response.status(200).send(updateUserResponse);
    } else {
      response.status(403).send("forbidden!");
    }
  }
);

export const deleteTodo = functions.https.onRequest(
  async (request, response) => {
    if (request.method == "POST") {
      if (!request.body.todoId) {
        response.status(400).send("todoId should be passed in parameter");
        return;
      }
      const deleteTodoResponse = await prisma.todo.delete({
        where: {
          id: Number(request.body.todoId),
        },
      });
      response.status(200).send(deleteTodoResponse);
    } else {
      response.status(403).send("forbidden!");
    }
  }
);
