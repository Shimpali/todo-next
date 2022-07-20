import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { UserSession } from './auth/[...nextauth]';

const prisma = new PrismaClient();

// GET /api/todos -> all the todos of the current user
export const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (request.method !== 'GET') {
    response.status(405).send('Method Not Allowed');
    return;
  }

  const session: Session | null = await getSession({ req: request });

  if (!session) {
    response.status(401).send('Unauthorized');
    return;
  }

  if (request.method === 'GET') {
    const userSession: UserSession = session as UserSession;
    const todos = await prisma.todo.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        }
      ],
      where: {
        userId: userSession.userId
      }
    });

    return response.json(todos);
  }
};

export default handler;
