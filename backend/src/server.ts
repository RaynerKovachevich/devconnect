import app from "./app";

const port = Number(process.env.Port) || 5000;

app.listen(port, () => {
    console.log(`Server runnig on http://localhost:${port}`);
});