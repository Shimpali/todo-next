import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { UserSession } from './auth/[...nextauth]';

const prisma = new PrismaClient();

// POST /api/todo -> create todo
export const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (request.method !== 'POST') {
    response.status(405).send('Method Not Allowed');
    return;
  }

  const session: Session | null = await getSession({ req: request });

  if (!session) {
    response.status(401).send('Unauthorized');
    return;
  }

  if (request.method === 'POST') {
    const { title } = request.body;

    if (!title) {
      response.status(400).send('Bad Request');
      return;
    }

    const userSession: UserSession = session as UserSession;
    const todo = await prisma.todo.create({
      data: {
        title,
        userId: userSession.userId,
        isCompleted: false
      }
    });

    return response.json(todo);
  }
};

export default handler;
