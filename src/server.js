const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + '/public_html'));

app.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    statusCode: 200,
  })
});

app.post('/generate-fiscal-code', (req, res) => {
  res.json({
    isValid: true,
    fiscalcode: 'valid-fiscal-code',
  })
});

app.get('*', (req, res) => {
  res.json({
    status: 'Page Not Found',
    statusCode: 404,
  })
});

app.listen(PORT, () => console.log(`> Ready on http://localhost:${PORT}`));
