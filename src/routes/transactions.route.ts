import { Router } from 'express';
import { getUserTransactions } from '../controllers/transactions.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for managing user transactions
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions for the authenticated user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: accountFrom
 *         schema:
 *           type: string
 *         description: Filter transactions by account ID
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter transactions starting from this date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter transactions up to this date
 *     responses:
 *       200:
 *         description: A list of user transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60c72b2f5f1b2c6d88f6b0e9
 *                   amount:
 *                     type: number
 *                     example: 150.5
 *                   type:
 *                     type: string
 *                     example: deposit
 *                   accountFrom:
 *                     type: string
 *                     example: 65ab1234567890abcdef1234
 *                   accountTo:
 *                     type: string
 *                     example: 65ab9876543210fedcba4321
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-01-20T10:00:00Z
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get('/', getUserTransactions);

export default router;
