import express from 'express';

const app = express();

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(8080, () => console.log("Running on localhost:8080"));