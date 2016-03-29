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
            trainNumberstoDurationMap[train["number"]]={}
            trainNumberstoDurationMap[train["number"]]["departure"]=train["src_departure_time"]
            trainNumberstoDurationMap[train["number"]]["arrival"]=train["dest_arrival_time"]
            trainNumberstoDurationMap[train["number"]]["duration"]=train["travel_time"]

    return  trainNumbers

def parseAndReturnFare(jsonData,trainCounter):
    returnedFareData = json.loads(jsonData.content)
    route={}
    if len(returnedFareData["fare"])!=0:
        full={}
        full["carrierName"]=returnedFareData["train"]["name"]
        full["price"]=returnedFareData["fare"][0]["fare"]
        full["duration"]=trainNumberstoDurationMap[returnedFareData["train"]["number"]]["duration"]
        full["id"]= "train"+str(trainCounter)
        full["mode"]="train"
        full["site"]="IRCTC"
        full["source"]=returnedFareData["from"]["name"]
        full["destination"]=returnedFareData["to"]["name"]
        full["arrival"]=trainNumberstoDurationMap[returnedFareData["train"]["number"]]["arrival"]
        full["departure"]=trainNumberstoDurationMap[returnedFareData["train"]["number"]]["departure"]
        route["full"]=[]
        route["parts"]=[]
        route["full"].append(full)
        parts=full
        parts["id"]="train"+str(trainCounter)+str(1)
        route["parts"].append(parts)
    return route

