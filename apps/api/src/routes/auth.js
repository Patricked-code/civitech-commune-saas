const { login, logout, listDemoUsers } = require('../services/auth.service');
const { requireAuth } = require('../middleware/auth.middleware');

module.exports = (app) => {
  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }
    const session = await login(email, password);
    if (!session) {
      return res.status(401).json({ error: 'invalid credentials' });
    }
    return res.json(session);
  });

  app.post('/api/auth/logout', requireAuth, (req, res) => {
    logout(req.token);
    return res.json({ success: true });
  });

  app.get('/api/auth/me', requireAuth, (req, res) => {
    return res.json(req.auth);
  });

  app.get('/api/auth/demo-users', async (req, res) => {
    const data = await listDemoUsers();
    return res.json({ data });
  });
};
