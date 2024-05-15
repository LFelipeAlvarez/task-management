import app from './app'
import { PORT } from './config/enviromentVars'

app.listen(+PORT, '0.0.0.0', () => {})
