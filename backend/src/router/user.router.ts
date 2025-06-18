import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Get all users route');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Get user with id ${id}`);
});

export default router;
