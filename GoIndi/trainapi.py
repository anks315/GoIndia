__author__ = 'ankur'


import hmac
import json

def generateHash():

    digest_maker = hmac.new('f707f95d07aa0f270d07bf71c74dc915')
    digest_maker.update('NDLSCnB10-03-20161Atimejson14c98f7aca50827374ab773844a9ca1b')
    return digest_maker.hexdigest();

trainNumberstoDurationMap ={}

def parseTrainBetweenStationsAndReturnTrainNumber(jsonData):
    returnedData = json.loads(jsonData.content)
    trainNumbers = []
    global trainNumberstoDurationMap
    for train in returnedData["train"]  :
            trainNumbers.append(train["number"])
            trainNumberstoDurationMap[train["number"]]=train["travel_time"]
    return  trainNumbers

def parseAndReturnFare(jsonData):
    returnedFareData = json.loads(jsonData.content)
    route={}
    if len(returnedFareData["fare"])!=0:
        full={}
        full["id"]=returnedFareData["train"]["name"]
        full["price"]=returnedFareData["fare"][0]["fare"]
        full["duration"]=trainNumberstoDurationMap[returnedFareData["train"]["number"]]
        route["full"]=full
    return route

