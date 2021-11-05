import Fastify from "fastify";
import controllers from './src/api/controllers';
import errors from "./src/infra/errors";

const port = process.env.PORT;
const server = Fastify({ logger: true });

server.post('/api/auction.create', req => {
  const response = controllers.auction.create(req);

  return response;
});

server.post('/api/bidder.create', req => {
  const response = controllers.bidder.create(req);

  return response;
});

server.post('/api/bid.add', req => {
  const response = controllers.bid.add(req);

  return response;
});

server.post('/api/auction.knock', req => {
  const response = controllers.auction.knock(req);

  return response;
});

server.setErrorHandler((err, req, res) => {
  const problem = errors.handle(err);

  res.status(problem.status).send(problem);
});

server.setNotFoundHandler((req, res) => {
  const err = new errors.AppError(errors.ErrorType.NotFound, 'The requested resource was not found', 'The requested resource was not found', true);
  const problem = errors.handle(err);

  res.status(problem.status).send(problem);
});

server.listen(port)
  .then(address => console.log(`Applications is listening on port ${address}`))
  .catch(err => console.log('Error starting the server:', err));
