import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import { join } from 'path'

dotenv.config() // carrega as variáveis de ambiente do arquivo .env

const dataBase = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE || './src/database/database.sqlite',
  entities: [
    join(__dirname, '..', 'models/*.{ts,js}')
  ],
  logging: true, // log das queries executadas
  synchronize: true // cria as tabelas automaticamente (Não recomendado para apps em produção)
})

dataBase.initialize()
  .then(() => {
    console.log(`Banco de dados inicializado`);
  })
  .catch((erro) => {
    console.error(`Erro ao inicializar o banco de dados`, erro);
  })

export default dataBase