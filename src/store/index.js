import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

var socket = io('wss://​le-18262636.bitzonte.com', { path: '/stocks' });

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    conectado: 'Conectar',
    ex: [],
    dataEx: {},
    stocks: [],
    dataStocks: {},
    dataUpdate: [],
    dataBuy: new Map(),
    dataSell: new Map(),
  },
  mutations: {
    conectar: (state) => {
      if (state.conectado === 'Desconectar') {
        socket.disconnect()
        state.conectado = 'Conectar'
      }
      else {
        socket.connect()
        state.conectado = 'Desconectar'
        socket.on('BUY', (data) => {
          let datos = data
          if (state.dataBuy.has(data['ticker'])) {
            state.dataBuy.get(data['ticker']).push({volume: data['volume'], time: data['time']})
          }
          else {
            state.dataBuy.set(data['ticker'], [{volume: data['volume'], time: data['time']}])
          }
          update_buy(datos, state)
        })
        socket.on('SELL', (data) => {
          let datos = data 
          if (state.dataSell.has(data['ticker'])) {
            state.dataSell.get(data['ticker']).push({volume: data['volume'], time: data['time']})
          }
          else {
            state.dataSell.set(data['ticker'], [{volume: data['volume'], time: data['time']}])
          }
          update_sell(datos, state)
        })
        socket.on('UPDATE', (data) => {
          let datos = data
          state.dataUpdate.push(datos)
          update_st(state.dataStocks[datos['ticker']], datos['value'])
        })
      }
    },
    append_stocks: (state, data) => {
      state.dataStocks = data['1']
      state.stocks = data['2']
    },
    append_ex: (state, data) => {
      state.dataEx = data['1']
      state.ex = data['2']
    }
  },
  actions: {

  },
  modules: {

  },
})

export default store;

socket.emit('EXCHANGES')
socket.once('EXCHANGES', (data) => {
  let ex = {}
  const exchanges = Object.keys(data) 
  exchanges.forEach((exc) => {
    ex[exc] = {
      v_compra: 0,
      v_venta: 0,
      v_total: 0,
      porcentaje: 0,
      address: data[exc]['address'],
      country: data[exc]['country'],
      companies: data[exc]['listed_companies'],
      name: data[exc]['name'],
    }
  })
  let datita = {
    '1': ex,
    '2': exchanges
  }
  store.commit('append_ex', datita)
})
socket.emit('STOCKS')
socket.once('STOCKS', (data) => {
  let s = []
  let stocks = {}
  for (let stock in data) {
    s.push(data[stock]['ticker'])
    stocks[data[stock]['ticker']] = {
      company: data[stock]['company_name'],
      country: data[stock]['country'],
      v_alto: 0,
      v_actual: 0,
      v_bajo: 999999999999999999999999,
      variacion: 0,
      v_compra: 0,
      v_venta: 0,
    }
  }
  let datita = {
    '1': stocks,
    '2': s
  }
  store.commit('append_stocks', datita)
  store.commit('conectar')
})

let update_st = (data, precio) => {
  if (data['v_alto'] <= precio) {
    data['v_alto'] = precio
  }
  if (data['v_bajo'] >= precio) {
    data['v_bajo'] = precio
  }
  data['variacion'] = (100 * (data['v_actual'] - precio) / data['v_actual']).toFixed(1)
  data['v_actual'] = precio
}

let update_buy = (data, state) => {
  let suma_total = 0
  state.dataStocks[data['ticker']]['v_compra'] += data['volume']
  Object.keys(state.dataEx).forEach((ex) => {
    if (state.dataEx[ex]['companies'].includes(state.dataStocks[data['ticker']]['company'])) {
      state.dataEx[ex]['v_compra'] += data['volume']
      state.dataEx[ex]['v_total'] += data['volume']
    }
    suma_total += state.dataEx[ex]['v_total']
  })
  Object.keys(state.dataEx).forEach((ex) => {
    state.dataEx[ex]['porcentaje'] = (100 * (suma_total - state.dataEx[ex]['v_total']) / suma_total).toFixed(1)
  })
}

let update_sell = (data, state) => {
  let suma_total = 0
  state.dataStocks[data['ticker']]['v_venta'] += data['volume']
  Object.keys(state.dataEx).forEach((ex) => {
    if (state.dataEx[ex]['companies'].includes(state.dataStocks[data['ticker']]['company'])) {
      state.dataEx[ex]['v_venta'] += data['volume']
      state.dataEx[ex]['v_total'] += data['volume']
    }
    suma_total += state.dataEx[ex]['v_total']
  })
  Object.keys(state.dataEx).forEach((ex) => {
    state.dataEx[ex]['porcentaje'] = (100 * (suma_total - state.dataEx[ex]['v_total']) / suma_total).toFixed(1)
  })
}

