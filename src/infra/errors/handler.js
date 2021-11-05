import AppError from './app.error';
import Problem from './problem';
import ErrorType from './type.error';

/**
 * Handle an error
 * @param {AppError} err The error to be handled
 * @returns A problem created according to the error type
 */
const handle = (err) => {
  console.log(err);
  let status = 500;

  switch (err.type) {
    case ErrorType.NotFound:
      status = 404;
      break;
    case ErrorType.Conflict:
      status = 409;
      break;
    default:
      status = 500;
      break;
  }

  const problem = new Problem(err.type, status, err.title, err.detail);

  return problem;
};

export default handle;