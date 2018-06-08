import log from "fancy-log";
import app from "./src/app";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, () => log.info(`Server is listening on port ${PORT}`));
