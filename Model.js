import React from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
const apiUrl = "http://mobileexam.veripark.com/mobileforeks/service.asmx";

export default class Model extends React.Component {

    getCurrentDate = () => {
        var currentDate = new Date();
        var day = '' + currentDate.getDate();
        var month = '' + (currentDate.getMonth() + 1);
        var year = currentDate.getFullYear();
        var hour = '' + currentDate.getHours();
        var minute = '' + currentDate.getMinutes();
        if (day.length < 2) day = '0' + day;
        if (month.length < 2) month = '0' + month;
        if (hour.length < 2) hour = '0' + hour;
        if (minute.length < 2) minute = '0' + minute;
        //console.log(day + ':' + month + ':' + year+' '+hour+':'+minute);
        return (day + ':' + month + ':' + year + ' ' + hour + ':' + minute);
    };

    getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

    requestEncryptKey = () => {
        let xmls = '<?xml version="1.0" encoding="utf-8"?>\
          <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
            <soap:Body>\
              <Encrypt xmlns="http://tempuri.org/">\
                <request>RequestIsValid'+ this.getCurrentDate() + '</request>\
              </Encrypt>\
            </soap:Body>\
          </soap:Envelope>';
        return axios.post(apiUrl,
            xmls,
            {
                headers:
                {
                    'Content-Type': 'text/xml',
                    SOAPAction: 'http://tempuri.org/Encrypt'
                }
            }).then(res => {
                return res.data
            }).catch(err => {
                console.log("Error occured.")
            })
    };

    getEncryptResult = async () => {
        const requestEncryptResultResponse = await this.requestEncryptKey();
        let encryptResultValue = null;
        if (requestEncryptResultResponse != null) {
            parseString(requestEncryptResultResponse, { explicitArray: false }, function (err, result) {
                encryptResultValue = result["soap:Envelope"]["soap:Body"].EncryptResponse.EncryptResult;
            })
            return encryptResultValue;
        } else {
            return false;
        }
    };

    requestForexStocksAndIndexesInfo = async () => {
        let requestKey = await this.getEncryptResult();
        if (requestKey) {
            let xmls = '<?xml version="1.0" encoding="utf-8"?>\
          <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
            <soap:Body>\
              <GetForexStocksandIndexesInfo xmlns="http://tempuri.org/">\
                <request>\
                  <IsIPAD>false</IsIPAD>\
                  <DeviceID>test</DeviceID>\
                  <DeviceType>iphone</DeviceType>\
                  <RequestKey>'+ requestKey + '</RequestKey>\
                  <Period>Day</Period>\
                </request>\
              </GetForexStocksandIndexesInfo>\
            </soap:Body>\
          </soap:Envelope>';
            return axios.post(apiUrl,
                xmls,
                {
                    headers:
                    {
                        'Content-Type': 'text/xml',
                        SOAPAction: 'http://tempuri.org/GetForexStocksandIndexesInfo'
                    }
                }).then(res => {
                    return res.data;
                }).catch(err => {
                    console.log(err.response.data)
                })
        } else {
            console.log("Requestkey is not exist.");
        }
    };

    getForexStocksAndIndexesInfo = async () => {
        const requestForexStocksAndIndexesListResponse = await this.requestForexStocksAndIndexesInfo();
        let stocknIndexesResponseListforexStocksAndIndexesList = null;
        parseString(requestForexStocksAndIndexesListResponse, { explicitArray: false }, function (err, result) {
            var myResponseBody = result["soap:Envelope"]["soap:Body"];
            if (myResponseBody.GetForexStocksandIndexesInfoResponse.GetForexStocksandIndexesInfoResult.RequestResult.Success == "true") {
                let stockAndIndex = myResponseBody.GetForexStocksandIndexesInfoResponse.GetForexStocksandIndexesInfoResult.StocknIndexesResponseList.StockandIndex;
                let imkb100 = myResponseBody.GetForexStocksandIndexesInfoResponse.GetForexStocksandIndexesInfoResult.IMKB100List.IMKB100;
                let imkb50 = myResponseBody.GetForexStocksandIndexesInfoResponse.GetForexStocksandIndexesInfoResult.IMKB50List.IMKB50;
                let imkb30 = myResponseBody.GetForexStocksandIndexesInfoResponse.GetForexStocksandIndexesInfoResult.IMKB30List.IMKB30;
                stocknIndexesResponseListforexStocksAndIndexesList = new Map([["stockAndIndex", stockAndIndex], ["imkb100", imkb100], ["imkb50", imkb50], ["imkb30", imkb30]]);
            } else {
                console.log("Error occured.");
            }
        });
        return stocknIndexesResponseListforexStocksAndIndexesList;
    };

    requestForexStocksAndIndexesInfoDetail = async (requestedSymbol, period) => {
        let requestKey = await this.getEncryptResult();
        if (requestKey) {
            let xmls = '<?xml version="1.0" encoding="utf-8"?>\
          <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
            <soap:Body>\
              <GetForexStocksandIndexesInfo xmlns="http://tempuri.org/">\
                <request>\
                  <IsIPAD>false</IsIPAD>\
                  <DeviceID>test</DeviceID>\
                  <DeviceType>iphone</DeviceType>\
                  <RequestKey>'+ requestKey + '</RequestKey>\
                  <RequestedSymbol>'+ requestedSymbol + '</RequestedSymbol>\
                  <Period>'+ period + '</Period>\
                </request>\
              </GetForexStocksandIndexesInfo>\
            </soap:Body>\
          </soap:Envelope>';
            return axios.post(apiUrl,
                xmls,
                {
                    headers:
                    {
                        'Content-Type': 'text/xml',
                        SOAPAction: 'http://tempuri.org/GetForexStocksandIndexesInfo'
                    }
                }).then(res => {
                    return res.data;
                }).catch(err => {
                    console.log(err.response.data)
                })
        } else {
            console.log("Requestkey is not exist.");
        }
    };

    getForexStocksAndIndexesInfoDetail = async (requestedSymbol, period) => {
        const requestForexStocksAndIndexesListResponse = await this.requestForexStocksAndIndexesInfoDetail(requestedSymbol, period);
        let stocknIndexesResponseListforexStocksAndIndexesDetail = null;
        parseString(requestForexStocksAndIndexesListResponse, { explicitArray: false }, function (err, result) {
            var myResponseBody = result["soap:Envelope"]["soap:Body"];
            if (myResponseBody.GetForexStocksandIndexesInfoResponse.GetForexStocksandIndexesInfoResult.RequestResult.Success == "true") {
                stocknIndexesResponseListforexStocksAndIndexesDetail = myResponseBody.GetForexStocksandIndexesInfoResponse.GetForexStocksandIndexesInfoResult.StocknIndexesGraphicInfos.StockandIndexGraphic;
            } else {
                console.log("Error occured.");
            }
        });
        return stocknIndexesResponseListforexStocksAndIndexesDetail;
    };

}
