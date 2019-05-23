/**
 * 小程序配置文件
 */



const baseUrl = 'https://127.0.0.1:8080/csbService';

const config = {


  getOpenId: `${baseUrl}/csb/getOpenId`,
  cancelOrder: `${baseUrl}/csb/cancelOrder`,
  buy: `${baseUrl}/csb/buy`,
  queryGoodsInfosList: `${baseUrl}/csb/queryGoodsInfosList`,
  getOpenId: `${baseUrl}/csb/getOpenId`,
    queryOrdersByCode: `${baseUrl}/csb/queryOrdersByCode`,

}

module.exports = config
