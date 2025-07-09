import Fastify from 'fastify';
import { categoryRoutes } from './routes/categoryRoutes';
import { bankRoutes } from './routes/bankRoutes';
import { transactionRoutes } from './routes/transactionRoutes';
// Importing the routes

const fastify = Fastify();

fastify.register(categoryRoutes);
fastify.register(bankRoutes);
fastify.register(transactionRoutes);
// Registering the routes

fastify.listen({ port: 3333 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running at ${address}`);
});