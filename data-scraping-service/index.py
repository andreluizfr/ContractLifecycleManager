from datetime import date, timedelta
import schedule
import time
from pymongo import MongoClient
from bcb import sgs
from bcb import currency

def update_daily_rates_data():
    data_dia_atual = date.today().strftime('%Y-%m-%d')
    data__dia_anterior = (date.today() - timedelta(days=1)).strftime('%Y-%m-%d')
    data_primeiro_dia_do_ano = date(date.today().year, 1, 1).strftime('%Y-%m-%d')

    selic_df = sgs.get({'selic': 432}, start=data__dia_anterior)
    ipca_df = sgs.get({'IPCA': 433}, start=data_primeiro_dia_do_ano)

    dollar_df = currency.get(['USD'],
                      start=data__dia_anterior,
                      end=data_dia_atual,
                      side='ask')

    daily_rate = {
        'dollar': float(dollar_df['USD'].iloc[-1]),
        'currentSelic': float(selic_df['selic'].iloc[-1]),
        'accumulatedIPCA': float(ipca_df['IPCA'].sum()),
        'numberOfMonthsAccumulatedIPCA': int(ipca_df['IPCA'].count())
    }

    result = collection.insert_one(daily_rate)

    print(f"Entidade inserida com o ID: {result.inserted_id}")


USERNAME = "mongo"
PASSWORD = "password"
DB_PORT = "27017"
DB_HOST = "127.0.0.1"
DB_NAME = "contractLifecycleManagement"

MONGO_URI = "mongodb://" + USERNAME +":" + PASSWORD + "@" + DB_HOST + ":" + DB_PORT + "/"
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db['daily_rates']

schedule.every(1).hours.do(update_daily_rates_data)

while True:
    schedule.run_pending()
    time.sleep(30)