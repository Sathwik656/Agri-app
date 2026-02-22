const validate = (schema) => (req, res, next) => {
    try {
        const validated = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        // Re-assign validated properties in case Zod stripped anything or set defaults
        req.body = validated.body;
        req.query = validated.query;
        req.params = validated.params;

        next();
    } catch (err) {
        // Detailed error logging for dev
        console.error("Zod Validation Error:", err.errors);

        return res.status(400).json({
            success: false,
            message: err.errors[0]?.message || 'Validation failed',
            errors: err.errors,
        });
    }
};

module.exports = validate;
