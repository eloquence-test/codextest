import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { rows } = await db.query('SELECT * FROM todos ORDER BY position');
    res.status(200).json(rows);
  } else if (req.method === 'POST') {
    const { title, tags } = req.body;
    const { rows } = await db.query('SELECT COALESCE(MAX(position),0)+1 AS pos FROM todos');
    const pos = rows[0].pos;
    const result = await db.query('INSERT INTO todos(title,tags,position) VALUES ($1,$2,$3) RETURNING *', [title, tags||[], pos]);
    res.status(201).json(result.rows[0]);
  } else if (req.method === 'PUT') {
    const { id, title, tags, position } = req.body;
    const result = await db.query('UPDATE todos SET title=$1, tags=$2, position=$3 WHERE id=$4 RETURNING *', [title, tags, position, id]);
    res.status(200).json(result.rows[0]);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await db.query('DELETE FROM todos WHERE id=$1', [id]);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
