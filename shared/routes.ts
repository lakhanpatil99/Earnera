import { z } from 'zod';
import { insertUserSchema, insertTaskSchema, insertTransactionSchema, users, tasks, transactions } from './schema';
import type { InsertUser, LoginRequest } from './schema';

export type { InsertUser, LoginRequest };

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login',
      input: z.object({ email: z.string(), password: z.string() }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.object({ message: z.string() }),
      },
    },
    register: {
      method: 'POST' as const,
      path: '/api/auth/register',
      input: insertUserSchema,
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout',
      responses: {
        200: z.void(),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/auth/me',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.void(),
      },
    }
  },
  tasks: {
    list: {
      method: 'GET' as const,
      path: '/api/tasks',
      responses: {
        200: z.array(z.custom<typeof tasks.$inferSelect>()),
      },
    },
    complete: {
      method: 'POST' as const,
      path: '/api/tasks/:id/complete',
      responses: {
        200: z.object({ 
          newBalance: z.number(),
          message: z.string()
        }),
        404: errorSchemas.notFound,
      },
    },
  },
  wallet: {
    get: {
      method: 'GET' as const,
      path: '/api/wallet',
      responses: {
        200: z.object({
          balance: z.number(),
          transactions: z.array(z.custom<typeof transactions.$inferSelect>())
        }),
      },
    },
    withdraw: {
      method: 'POST' as const,
      path: '/api/wallet/withdraw',
      input: z.object({ amount: z.number() }),
      responses: {
        200: z.object({ 
          newBalance: z.number(),
          message: z.string() 
        }),
        400: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
