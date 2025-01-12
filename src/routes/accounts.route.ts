import { Router } from 'express';
import { createAccount, getUserAccounts, getUserAccountById } from '../controllers/accounts.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: API for managing user accounts
 */

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               balance:
 *                 type: number
 *                 example: 1000
 *               currency:
 *                 type: string
 *                 example: USD
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Account created successfully
 */
router.post('/', createAccount);

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all user accounts
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: A list of user accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 60c72b2f5f1b2c6d88f6b0e9
 *                   balance:
 *                     type: number
 *                     example: 1000
 *                   currency:
 *                     type: string
 *                     example: USD
 */
router.get('/', getUserAccounts);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get a specific account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The account ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60c72b2f5f1b2c6d88f6b0e9
 *                 balance:
 *                   type: number
 *                   example: 1000
 *                 currency:
 *                   type: string
 *                   example: USD
 *       404:
 *         description: Account not found
 */
router.get('/:id', getUserAccountById);

export default router;
