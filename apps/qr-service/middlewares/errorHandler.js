export const errorHandler = (err, _res, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
};
