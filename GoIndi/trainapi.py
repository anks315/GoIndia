__author__ = 'ankur'


import hmac
import json
import trainConstants
from google.appengine.api import urlfetch

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


class PlaceToStationCodesCache:
    """Class returs all stations corresponding to a city"""

    def __init__(self):
        self.cityToStationsMap = {}

    def parseStationNameToStationCodes(self,jsonData):
        returnedData = json.loads(jsonData.content)
        stationList=[]
        if returnedData["response_code"]=="200":
            for station in returnedData["stations"]:
                stationList.append(station["code"])

        return  stationList

    def getStationsByCode(self,stationName):
        if stationName in self.cityToStationsMap:
            return self.cityToStationsMap[stationName]
        else:
            jsonResponseNameToCode = urlfetch.fetch("http://api.railwayapi.com/name_to_code/station/"+ stationName + "/apikey/" + trainConstants.ERAILWAYAPI_APIKEY + "/",method=urlfetch.GET, deadline=45)
            stationList = self.parseStationNameToStationCodes(jsonResponseNameToCode)
            if stationList:
                self.cityToStationsMap[stationName]=stationList
            return stationList


class TrainController:
    """Entry point to get all routes with train as the major mode of transport"""
    placetoStationCodesCache = PlaceToStationCodesCache()


    def findTrainsBetweenStations(self,sourceStationList,destinationStationList,journeyDate):
        resultJsonData = {}
        for sourceStation in sourceStationList:

            resultJsonData["train"]=[]
            for destinationStation in destinationStationList:
                jsonResponseTrainBetweenStations = urlfetch.fetch("http://api.railwayapi.com/between/source/"+ sourceStation + "/dest/" + destinationStation+ "/date/" + journeyDate +"/apikey/"+ trainConstants.ERAILWAYAPI_APIKEY +"/",method=urlfetch.GET, deadline=45)
                availableTrainNumbers = parseTrainBetweenStationsAndReturnTrainNumber(jsonResponseTrainBetweenStations)
                trainCounter=0
                for trainNumber in availableTrainNumbers:
                    trainCounter=trainCounter+1
                    jsonResponseTrainFare = urlfetch.fetch("http://api.railwayapi.com/fare/train/" + trainNumber + "/source/"+ sourceStation+ "/dest/"+ destinationStation+ "/age/18/quota/GN/doj/"+ journeyDate+ "/apikey/"+trainConstants.ERAILWAYAPI_APIKEYkylhf9760 +"/",method=urlfetch.GET, deadline=45)
                    fareData=parseAndReturnFare(jsonResponseTrainFare,trainCounter)
                    if not fareData:
                        pass
                    else:
                        resultJsonData["train"].append(fareData)

        return resultJsonData

    def getRoutes(self,source,destination,dateOfJourney):
        urlfetch.set_default_fetch_deadline(45)
        sourceStations = self.placetoStationCodesCache.getStationsByCode(source)
        destinationStations = self.placetoStationCodesCache.getStationsByCode(destination)
        if not sourceStations or not destinationStations:
            return
        else:
            self.findTrainsBetweenStations(sourceStations,destinationStations)

