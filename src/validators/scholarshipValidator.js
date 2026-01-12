const { z } = require('zod');

const processedDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  totalHours: z.number(),
  finalStipend: z.number(),
});

const scholarshipSchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/, 'Month must be in YYYY-MM format'),
  amount: z.number().positive('Amount must be a positive number'),
  user_id: z.string().optional().default('default'),
  details: z.object({
    studentCount: z.number(),
    totalHours: z.number(),
    monthlyStipend: z.number(),
    processedData: z.array(processedDataSchema),
  }),
});

function validateScholarship(data) {
  try {
    return scholarshipSchema.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }
}

function validateScholarshipBatch(data) {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array of scholarships');
  }
  try {
    return data.map(item => scholarshipSchema.parse(item));
  } catch (error) {
    throw new Error(`Validation failed: ${error.message}`);
  }
}

module.exports = {
  validateScholarship,
  validateScholarshipBatch,
};