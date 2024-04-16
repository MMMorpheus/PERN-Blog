import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare namespace global {
	var _db: PrismaClient | undefined;
}

if (!global._db) {
	global._db = new PrismaClient();
}

db = global._db;

export { db };
