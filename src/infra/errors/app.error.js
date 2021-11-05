class AppError extends Error {
  constructor(type, title, detail, isOperational) {
    super(detail);
    this.type = type;
    this.title = title;
    this.detail = detail;
    this.isOperational = isOperational;
  }
}

export default AppError;